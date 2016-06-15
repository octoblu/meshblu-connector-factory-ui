import React from 'react';
import { Route, Router, IndexRoute } from 'react-router';
import AppLayout from './containers/app-layout';
import Authenticated from './containers/authenticated';
import Home from './containers/home';
import GettingStarted from './containers/getting-started';
import Create from './containers/connectors/create';
import Generate from './containers/connectors/generate';
import Generated from './containers/connectors/generated';
import Configure from './containers/things/configure';
import Installed from './containers/things/installed';
import Available from './containers/things/available';
import NotFound from './components/NotFound';
import { storeAuthentication, logout } from './helpers/authentication';

export default ({ history }) => {
  return (
    <Router history={history}>
      <Route path="/" component={AppLayout}>
        <Route path="/authenticated" onEnter={storeAuthentication} />
        <Route path="/logout" onEnter={logout} />
        <Route path="/getting-started" component={GettingStarted} />
        <IndexRoute component={Home} />
        <Route path="/connectors" component={Authenticated}>
          <IndexRoute component={Installed} />
          <Route path="/connectors/create/:connector" component={Create} />
          <Route path="/connectors/generate/:uuid" component={Generate} />
          <Route path="/connectors/generated/:uuid/:key" component={Generated} />
        </Route>
        <Route path="/things" component={Authenticated}>
          <IndexRoute component={Installed} />
          <Route path="/things/all" component={Available} />
          <Route path="/things/my" component={Installed} />
          <Route path="/things/configure/:uuid" component={Configure} />
        </Route>
      </Route>
      <Route path="*" status={404} component={NotFound} />
    </Router>
  )
}
