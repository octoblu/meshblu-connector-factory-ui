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

    const logger = {}
    _.each(_.keys(console), (method) => {
      if (_.isFunction(console[method])) {
        if (method === 'error') {
          return
        }
        logger[method] = _.noop
      }
    })

    logger.error = function (ex, ...extra) {
      Raven.captureException(ex, { extra })
    }

    return {
      level: 'error',
      logger,
    }
  }
}
