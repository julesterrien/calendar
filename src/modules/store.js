import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line

const middlewares = [thunk, createLogger()];

const store = createStore(
  combineReducers(reducers),
  composeEnhancers(applyMiddleware(...middlewares)),
);

export default store;
