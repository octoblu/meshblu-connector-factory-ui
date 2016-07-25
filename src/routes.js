import React from 'react'
import { Route, Router, IndexRoute } from 'react-router'
import AppLayout from './containers/app-layout'
import Home from './containers/home'
import Available from './containers/connectors/available'
import Configure from './containers/connectors/configure'
import Create from './containers/connectors/create'
import Download from './containers/connectors/download'
import Downloading from './containers/connectors/downloading'
import DownloadOptions from './containers/connectors/downloadOptions'
import Generate from './containers/connectors/generate'
import Generated from './containers/connectors/generated'
import Installed from './containers/connectors/installed'
import NotFound from './components/NotFound'
import { onEnterRedirectTo } from './helpers/actions'
import { storeAuthentication, logout } from './helpers/authentication'

export default ({ history }) => {
  return (
    <Router history={history}>
      <Route path="/" component={AppLayout}>
        <Route path="/authenticated" onEnter={storeAuthentication} />
        <Route path="/logout" onEnter={logout} />
        <IndexRoute component={Home} />
        <Route path="/connectors">
          <IndexRoute component={Installed} />
          <Route path="/connectors/create/:owner/:connector" component={Create} />
          <Route path="/connectors/create/:connector" component={Create} />
          <Route path="/connectors/my" component={Installed} />
          <Route path="/connectors/available" component={Available} />
          <Route path="/connectors/generate/:uuid" component={Generate} />
          <Route path="/connectors/configure/:uuid" component={Configure} />

          <Route path="/connectors/generated/:uuid" component={Generated}>
            <Route path="/connectors/generated/:uuid/:otp/download" component={Download} />
            <Route path="/connectors/generated/:uuid/:otp/downloading" component={Downloading} />
            <Route path="/connectors/generated/:uuid/:otp/download-options" component={DownloadOptions} />
            {/*
            // <Route path="/connectors/generated/:uuid/:otp/downloading" component={Downloading} />
              <Route path="/connectors/generated/:uuid/downloading/:key" component={Downloading} />
            */}
          </Route>
        </Route>
        <Route path="/things">
          <IndexRoute component={Installed} />
          <Route path="/things/all" onEnter={onEnterRedirectTo('/connectors/available')} />
          <Route path="/things/my" onEnter={onEnterRedirectTo('/connectors/my')} />
          <Route path="/things/configure/:uuid" component={Configure} />
        </Route>
      </Route>
      <Route path="*" status={404} component={NotFound} />
    </Router>
  )
}
