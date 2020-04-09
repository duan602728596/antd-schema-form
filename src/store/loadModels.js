import React, { useEffect } from 'react';

/**
 * 异步注入reducer的修饰器
 * @param { object } models
 */
function loadModels(models) {
  let injectModels = true; // models是否需要注入

  /**
   * @param { Function } Module: 需要修饰的模块
   */
  return function(Module) {
    return function(props) {
      // 异步注入reducer
      function injectReducers() {
        if (injectModels) {
          props.injectReducers?.(models);
          injectModels = false;
        }
      }

      useEffect(function() {
        injectReducers();
      }, []);

      return <Module />;
    };
  };
}

export default loadModels;