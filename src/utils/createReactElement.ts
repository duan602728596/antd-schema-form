import type { ReactElement } from 'react';

/* 创建组件 */
function createReactElement(fn: Function | undefined, args: any[]): ReactElement | null {
  if (fn) {
    return fn(...args);
  } else {
    return null;
  }
}

export default createReactElement;