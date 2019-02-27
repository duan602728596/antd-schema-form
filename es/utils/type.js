/* 数据判断 */
export function isNumber(value) {
    return typeof value === 'number';
}
export function isString(value) {
    return typeof value === 'string';
}
export function isBoolean(value) {
    return typeof value === 'boolean';
}
export function isObjectOrArray(value) {
    return typeof value === 'object';
}
export function isObject(value) {
    return isObjectOrArray(value) && Object.prototype.toString.call(value) === '[object Object]';
}
export function isArray(value) {
    return isObjectOrArray(value) && Object.prototype.toString.call(value) === '[object Array]';
}
export function isModule(value) {
    return isObjectOrArray(value) && Object.prototype.toString.call(value) === '[object Module]';
}
export function isFunction(value) {
    return typeof value === 'function';
}
export function isSpace(value) {
    return value === null || value === undefined;
}
