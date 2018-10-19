import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ConnectedRouter } from 'react-router-redux';
import history from '../services/historyService';
import createStore from '../redux/create';
import sagas from '../redux/sagas';
import App from '../components/App/App';
import RoutesContainer from './RoutesContainer';

const { store, persistor } = createStore({});

sagas();

export default () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <App>
          <RoutesContainer />
        </App>
      </ConnectedRouter>
    </PersistGate>
  </Provider>
);