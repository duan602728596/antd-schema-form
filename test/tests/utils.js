/* 创建表单验证的onOk函数 */
export function createHandleClickFn(result) {
  return function(form, value) {
    result.value = value;
  };
}

/* 延迟函数 */
export function sleep(time = 300) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });
}