/**
 * omit函数的实现
 * @param { T } obj: object
 * @param { string[] } delKeys: 从object中删除的keys
 */
export function omit<T = object, U = T>(obj: T, delKeys: string[]): U {
  return Object.entries(obj).reduce(function(result: U, [key, value]: [string, any]): U {
    if (!delKeys.includes(key)) {
      result[key] = value;
    }

    return result;
  }, {} as U);
}

/* 判断是否为null或undefined */
export function isNil(o: any): boolean {
  return typeof o === 'undefined' || o === null;
}

/* 判断是否为boolean类型 */
export function isBoolean(o: any): boolean {
  return typeof o === 'boolean';
}

/* 判断是否为object类型 */
export function isObject(o: any): boolean {
  return typeof o === 'object' && o !== null;
}

/* 判断是否为object类型 */
export function isPlainObject(o: any): boolean {
  return typeof o === 'object' && Object.prototype.toString.call(o) === '[object Object]';
}

/* 判断是否为number类型 */
export function isNumber(o: any): boolean {
  return typeof o === 'number';
}

/* 判断是否为string类型 */
export function isString(o: any): boolean {
  return typeof o === 'string';
}