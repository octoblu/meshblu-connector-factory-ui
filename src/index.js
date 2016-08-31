import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'
import { ravenMiddleware } from './helpers/octoblu-raven'
import AppRoutes from './routes'
import reducers from './reducers'

import es6Promise from 'es6-promise'
es6Promise.polyfill()

const middleware = []
middleware.push(thunkMiddleware)
if (process.env.NODE_ENV !== 'production') {
  // middleware.push(createLogger())
} else {
  middleware.push(ravenMiddleware())
}
middleware.push(routerMiddleware(browserHistory))
const createStoreWithMiddleware = applyMiddleware(...middleware)

const store = createStore(reducers, createStoreWithMiddleware)
const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <AppRoutes history={history} />
  </Provider>,
  document.getElementById('app')
)
