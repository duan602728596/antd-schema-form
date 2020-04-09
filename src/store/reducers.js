import { combineReducers } from 'redux';

/* reducers */
const reducers = {};

/* 创建reducer */
export function createReducer(asyncReducers) {
  return combineReducers({
    ...reducers,
    ...asyncReducers
  });
}