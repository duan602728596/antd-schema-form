/* 数据判断 */
export function isNumber(value: any): boolean{
  return typeof value === 'number';
}

export function isString(value: any): boolean{
  return typeof value === 'string';
}

export function isBoolean(value: any): boolean{
  return typeof value === 'boolean';
}

export function isObjectOrArray(value: any): boolean{
  return typeof value === 'object';
}

export function isObject(value: any): boolean{
  return isObjectOrArray(value) && Object.prototype.toString.call(value) === '[object Object]';
}

export function isArray(value: any): boolean{
  return isObjectOrArray(value) && Object.prototype.toString.call(value) === '[object Array]';
}

export function isFunction(value: any): boolean{
  return typeof value === 'function';
}

export function isSpace(value: any): boolean{
  return value === null || value === undefined;
}