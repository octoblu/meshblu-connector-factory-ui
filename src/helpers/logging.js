import _ from 'lodash'
import Raven from 'raven-js'

export default class Logger {
  constructor({ dsn, log = true }) {
    this.log = log
    this.dsn = dsn
  }

  init() {
    if (!this.log || !this.dsn) {
      return
    }
    Raven.config(this.dsn).install()
  }

  getOptions() {
    if (!this.log || !this.dsn) {
      return
    }

    const logErrorNow = function (ex, ...extra) {
      console.error('error', ex, { ...extra })
      Raven.captureException(ex, { ...extra })
      return false
    }

    const logError = _.debounce(logErrorNow, 100)

    const predicate = (_, action) => {
      return action.error != null
    }

    return {
      level: logError,
      predicate,
      logErrors: false,
    }
  }
}
