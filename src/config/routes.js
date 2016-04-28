import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../containers/app';
import Home from '../containers/home';
import Create from '../containers/create';
import Configure from '../containers/configure';
import NotFound from '../components/NotFound/NotFound';
import { storeAuthentication } from '../helpers/authentication';

export default (
  <Route>
    <Route path="/authenticated" onEnter={storeAuthentication} />
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/create/:connector" component={Create} />
      <Route path="/configure/:uuid" component={Configure} />
    </Route>
    <Route path="*" status={404} component={NotFound} />
  </Route>
);
