import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';

export const sagaMiddleware = createSagaMiddleware();

export default history => applyMiddleware(
  thunk,
  sagaMiddleware,
  routerMiddleware(history),
);
