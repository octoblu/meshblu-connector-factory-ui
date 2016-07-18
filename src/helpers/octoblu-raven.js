import _ from 'lodash'
import createLogger from 'redux-logger'
import Raven from 'raven-js'

export default class OctobluRaven {
  constructor({ dsn } = {}) {
    this.dsn = process.env.SENTRY_DSN || dsn
  }

  getLogger() {
    if (!this.dsn) {
      return createLogger()
    }

    Raven.config(this.dsn).install()
    const logErrorNow = function (ex, ...extra) {
      console.error('error', ex, { ...extra })
      Raven.captureException(ex, { ...extra })
      return false
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
