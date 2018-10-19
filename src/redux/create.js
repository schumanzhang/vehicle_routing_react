import { createStore, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import { composeWithDevTools } from 'redux-devtools-extension';
import history from '../services/historyService';
import middleware from './middleware';
import reducers from './reducers';

// TODO - Consider moving the configuration into a separate file,
//        allows for whitelist / blacklisting reducers
// Reference - https://github.com/rt2zz/redux-persist#user-content-blacklist--whitelist
const persistConfig = {
  key: 'root',
  storage,
};

const initialState = {};

export default (state = initialState, config = persistConfig) => {
  let composeMiddleware;
  if (process.env.NODE_ENV === 'production') {
    composeMiddleware = compose(middleware(history));
  } else {
    composeMiddleware = composeWithDevTools(middleware(history));
  }
  const persistedReducer = persistReducer(config, reducers);
  const store = createStore(persistedReducer, state, composeMiddleware);
  const persistor = persistStore(store);
  return { store, persistor };
};
