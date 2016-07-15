import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'
import Logger from './helpers/logging'
import AppRoutes from './routes'
import reducers from './reducers'

const shouldLog = process.env.NODE_ENV === 'production'

const logger = new Logger({ dsn: 'https://262ab2f8e7f04d13bc0f6e03e00d2f86@app.getsentry.com/87245', log: shouldLog })
logger.init()

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  createLogger(logger.getOptions()),
  routerMiddleware(browserHistory)
)

const store = createStore(reducers, createStoreWithMiddleware)
const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <AppRoutes history={history} />
  </Provider>,
  document.getElementById('app')
)
