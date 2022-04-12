/* 全局的store */
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { reducersMapObject } from './reducers';

/* reducer列表 */
const reducer = combineReducers(reducersMapObject);

/* store */
export let store;

function createStore(initialState = {}) {
  store = configureStore({
    reducer,
    preloadedState: initialState,
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware();
    }
  });
}

export function storeFactory(initialState = {}) {
  // 避免热替换导致redux的状态丢失
  if (!store) {
    createStore(initialState);
  }

  return store;
}

/* 异步注入store */
export function replaceReducer(asyncReducer) {
  Object.assign(reducersMapObject, asyncReducer);
  store.replaceReducer(combineReducers(reducersMapObject));
}