/**
 * 数据判断
 *
 * @flow
 */
export function isNumber<T>(value: T): boolean{
  return typeof value === 'number';
}

export function isString<T>(value: T): boolean{
  return typeof value === 'string';
}

export function isBoolean<T>(value: T): boolean{
  return typeof value === 'boolean';
}

export function isObjectOrArray<T>(value: T): boolean{
  return typeof value === 'object';
}

export function isObject<T>(value: T): boolean{
  return isObjectOrArray(value) && Object.prototype.toString.call(value) === '[object Object]';
}

export function isArray<T>(value: T): boolean{
  return isObjectOrArray(value) && Object.prototype.toString.call(value) === '[object Array]';
}

export function isFunction<T>(value: T): boolean{
  return typeof value === 'function';
}

export function isSpace<T>(value: T): boolean{
  return value === null || value === undefined;
}