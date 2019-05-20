import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { Store } from 'redux';
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from './store';

import routes from './routes';

declare let module: any;

/**
 * Create Redux store for app -
 * combining reducers and any other needed configuration
 */
const store: Store = configureStore();

/**
 * Render React app -
 * Wraps root app component in Redux
 */
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>{routes}</ConnectedRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement,
);

/**
 * Enable hot reloading - needed to work with TS
 */
if (module.hot) {
  module.hot.accept();
}
