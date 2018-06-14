// ./react-redux-client/src/reducers/index.js
import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import appReducer from './appReducer';
import { userReducer } from './userReducer';
import { productReducer } from './productReducer';
import { reports } from './report';
import { reducer as sematable } from 'sematable';

export default combineReducers({
  appState: appReducer,
  userState: userReducer,
  productState: productReducer,
  routing,
  sematable,
  report: reports
  // More reducers if there are
  // can go here
})

