/**
 * 异步加载模块
 */
import { lazy, Suspense } from 'react';
import { injectReducers } from '../store/store';
import SwitchLoading from '../layouts/SwitchLoading/index';

const Fallback = <SwitchLoading />;

/**
 * 异步加载、注入模块和reducer
 * @param { Function } loader: 需要异步注入的模块
 */
function asyncModule(loader) {
  const Module = lazy(loader);

  return () => (
    <Suspense fallback={ Fallback }>
      <Module injectReducers={ injectReducers } />
    </Suspense>
  );
}

export default asyncModule;