import * as React from 'react';

/* 创建组件 */
function createElement(fn: Function | undefined, args: any[]): React.ReactElement | null {
  if (fn) {
    return fn(...args);
  } else {
    return null;
  }
}

export default createElement;