/* 异步加载模块 */
import React, { lazy, Suspense } from 'react';
import { injectReducers } from '../store/store';

/**
 * 异步加载、注入模块和reducer
 * @param { Function } loader: 需要异步注入的模块
 */
function asyncModule(loader: Function): React.Element{
  const Module: Function = lazy(loader);

  return (): React.Element => (
    <Suspense fallback={ null }>
      <Module injectReducers={ injectReducers } />
    </Suspense>
  );
}

export default asyncModule;