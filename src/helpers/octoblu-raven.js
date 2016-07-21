import Raven from 'raven-js'

const SENTRY_DSN = process.env.SENTRY_DSN
const SENTRY_RELEASE = process.env.SENTRY_RELEASE

function defaultMiddleware() {
  return () => (next) => (action) => {
    next(action)
  }
}

export function ravenConfigure({ dsn = SENTRY_DSN, release = SENTRY_RELEASE } = {}) {
  if (!Raven.isSetup()) {
    if (!dsn) {
      return defaultMiddleware()
    }
    Raven.config(dsn, { release }).install()
  }
}

export function ravenMiddleware(options) {
  ravenConfigure(options)
  if (Raven.isSetup()) {
    return store => next => action => {
      try {
        Raven.captureBreadcrumb({
          data: { redux: action.type },
        })

        return next(action)
      } catch (err) {
        console.error('[octoblu-raven] Reporting error to Sentry:', err)
        Raven.captureException(err, {
          extra: {
            action,
            state: store.getState(),
          },
        })
      }
    }
  }
  return defaultMiddleware()
}

export function ravenSetUserContext({ uuid, email }, options) {
  ravenConfigure(options)
  if (Raven.isSetup()) {
    Raven.setUserContext({ uuid, email })
  }
}
