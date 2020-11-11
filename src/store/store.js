/* 全局的store */
import { configureStore } from '@reduxjs/toolkit';
import { createReducer } from './reducers';

/* reducer列表 */
const reducer = createReducer({});
const asyncReducers = {}; // 异步的reducers

/* store */
const store = {};

export function storeFactory(initialState = {}) {
  // 避免热替换导致redux的状态丢失
  if (Object.keys(store).length === 0) {
    /* store */
    Object.assign(store, configureStore({
      reducer,
      preloadedState: initialState
    }));
  }

  return store;
}

/* 注入store */
export function injectReducers(asyncReducer) {
  for (const key in asyncReducer) {
    // 获取reducer的key值，并将reducer保存起来
    if (!(key in asyncReducers)) {
      const item = asyncReducer[key];

      asyncReducers[key] = item;
    }
  }

  // 异步注入reducer
  store.replaceReducer(createReducer(asyncReducers));
}

export default store;