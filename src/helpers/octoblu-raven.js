import _ from 'lodash'
import createLogger from 'redux-logger'
import Raven from 'raven-js'

let userSet = false

export default class OctobluRaven {
  constructor({ dsn } = {}) {
    this.dsn = process.env.SENTRY_DSN || dsn
  }

  install() {
    if (Raven.isSetup()) {
      return
    }
    Raven.config(this.dsn).install()
  }

  setUser({ uuid, email }) {
    if (userSet) {
      return
    }
    this.install()
    Raven.setUserContext({ uuid, email })
    userSet = true
  }

  getLogger() {
    if (!this.dsn) {
      return createLogger()
    }

    this.install()
    const logErrorNow = function (error, ...extra) {
      if (_.isError(_.get(error, 'error'))) {
        console.error(error.error, ...extra)
        Raven.captureException(error.error)
      } else if (_.isError(error)) {
        console.error(error, ...extra)
        Raven.captureException(error)
      } else if (_.isString(error)) {
        console.error(error, ...extra)
        Raven.captureMessage(error)
      }
      Raven.captureException(error)
    }

    const logError = _.debounce(logErrorNow, 100)

    const predicate = (_, action) => {
      return action.error != null
    }

    return createLogger({
      level: logError,
      predicate,
      logErrors: false,
    })
  }
}
