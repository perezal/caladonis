import { combineReducers } from 'redux';

import { authentication } from './auth.reducer';
import { workouts } from './workouts.reducer';

import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  authentication,
  workouts,
  router: routerReducer,
});

export default rootReducer;