import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../containers/app';
import Authenticated from '../containers/authenticated';
import Home from '../containers/home';
import Create from '../containers/create';
import Configure from '../containers/configure';
import Installed from '../containers/installed';
import Available from '../containers/available';
import Generate from '../containers/generate';
import Generated from '../containers/generated';
import NotFound from '../components/NotFound/NotFound';
import { storeAuthentication } from '../helpers/authentication';

export default (
  <Route>
    <Route path="/authenticated" onEnter={storeAuthentication} />
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/connectors" component={Authenticated}>
        <IndexRoute component={Installed} />
        <Route path="/connectors/create/:connector" component={Create} />
        <Route path="/connectors/generate/:uuid" component={Generate} />
        <Route path="/connectors/generated/:uuid/:key" component={Generated} />
      </Route>
      <Route path="/things" component={Authenticated}>
        <IndexRoute component={Installed} />
        <Route path="/things/available" component={Available} />
        <Route path="/things/installed" component={Installed} />
        <Route path="/things/configure/:uuid" component={Configure} />
      </Route>
    </Route>
    <Route path="*" status={404} component={NotFound} />
  </Route>
);
