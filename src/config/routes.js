import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../containers/app';
import Home from '../containers/home';
import Create from '../containers/create';
import Configure from '../containers/configure';
import Installed from '../containers/installed';
import Available from '../containers/available';
import Generated from '../containers/generated';
import NotFound from '../components/NotFound/NotFound';
import { storeAuthentication } from '../helpers/authentication';

export default (
  <Route>
    <Route path="/authenticated" onEnter={storeAuthentication} />
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/connectors/installed" component={Installed} />
      <Route path="/connectors/available" component={Available} />
      <Route path="/connectors/create/:connector" component={Create} />
      <Route path="/connectors/generated/:uuid/:key" component={Generated} />
      <Route path="/connectors/configure/:uuid" component={Configure} />
    </Route>
    <Route path="*" status={404} component={NotFound} />
  </Route>
);
