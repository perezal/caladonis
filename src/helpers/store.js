import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';
import { history } from './history';
import { routerMiddleware } from 'react-router-redux';


const middlewares = [thunkMiddleware, routerMiddleware(history)];


if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger');
  middlewares.push(logger)
}

export const store = createStore(
    rootReducer,
    applyMiddleware(...middlewares)
);