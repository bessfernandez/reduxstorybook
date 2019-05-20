import { Reducer } from 'react';
import { createStore, combineReducers, AnyAction, applyMiddleware, Store } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { History, createBrowserHistory } from 'history';
import { match } from 'react-router';
import { routerMiddleware, connectRouter, RouterState } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';

import { AssessmentsState } from './assessments/types';
import assessmentsReducer from './assessments/reducers';

/**
 * Create new browser history object from `history` module (HTML 5 history API),
 * used in React Router as well as exposed in Redux state
 * to manage / mainpulate browser history
 */
export const history: History = createBrowserHistory();

/**
 * The top level state object -
 * any new top level states added to Redux also
 * need to be added here
 */
export interface ApplicationState {
  assessments: AssessmentsState;
  router: RouterState;
}

/**
 * Additional props for connected React components.
 * Note - `match` is provided by React Router when using `connect()`, and is
 * not provided in connected Redux router (and hence not part of state)
 */
export interface AdditionalConnectedProps {
  match?: match<Record<string, any>>;
}

/**
 * Combine all Redux reducers -
 * we add router to reducers to to have
 * access to browser history in Redux at all times
 */
const rootReducer = (historyState: History): Reducer<ApplicationState, AnyAction> =>
  combineReducers<ApplicationState>({
    assessments: assessmentsReducer,
    router: connectRouter(historyState),
  });

/**
 * Configure and create Redux store -
 * adds middleware for redux-thunk and any other needed middlewares
 */
export default function configureStore(): Store {
  const middlewares = [thunkMiddleware, routerMiddleware(history)];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(rootReducer(history), composeWithDevTools(middleWareEnhancer));

  return store;
}
