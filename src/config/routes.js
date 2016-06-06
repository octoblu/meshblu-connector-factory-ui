import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../containers/App';
import Authenticated from '../containers/Authenticated';
import Home from '../containers/Home';
import Create from '../containers/Create';
import Configure from '../containers/Configure';
import Installed from '../containers/Installed';
import Available from '../containers/Available';
import Generate from '../containers/Generate';
import Generated from '../containers/Generated';
import NotFound from '../components/NotFound';
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
