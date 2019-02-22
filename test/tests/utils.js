/* 创建表单验证的onOk函数 */
export function createHandleClickFn(result) {
  return function(form, value) {
    result.value = value;
  };
}