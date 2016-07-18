import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'
import OctobluRaven from './helpers/octoblu-raven'
import AppRoutes from './routes'
import reducers from './reducers'

const octobluRaven = new OctobluRaven()

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  octobluRaven.getLogger(),
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
