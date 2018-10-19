import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import appReducer from './appReducer';
import profileReducer from './profileReducer';

export default combineReducers({
  app: appReducer,
  profile: profileReducer,
  router: routerReducer,
});