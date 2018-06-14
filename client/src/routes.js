// ./react-redux-client/src/routes.js
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Home from './containers/Home';
import Login from './containers/Login';
import Register from './containers/Register';
import Products from './containers/Products';
import Report_c from './containers/Report_c';
import Report_s from './containers/Report_s';
import Report_s_Detail from './containers/Report_s_Detail';

export default (
  <Route path="/" component={App}>
     <IndexRoute component={Home} />
     <Route path="/login" component={Login} />
     <Route path="/register" component={Register} />
     <Route path="/Products" component={Products} />
     <Route path="/report_s" component={Report_s} />
     <Route path="/report_s/:id" component={Report_s_Detail} />
     <Route path="/report_c/:cat" component={Report_c} />
  </Route>
)
