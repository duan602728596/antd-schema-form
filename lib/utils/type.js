"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* 数据判断 */
function isNumber(value) {
    return typeof value === 'number';
}
exports.isNumber = isNumber;
function isString(value) {
    return typeof value === 'string';
}
exports.isString = isString;
function isBoolean(value) {
    return typeof value === 'boolean';
}
exports.isBoolean = isBoolean;
function isObjectOrArray(value) {
    return typeof value === 'object';
}
exports.isObjectOrArray = isObjectOrArray;
function isObject(value) {
    return isObjectOrArray(value) && Object.prototype.toString.call(value) === '[object Object]';
}
exports.isObject = isObject;
function isArray(value) {
    return isObjectOrArray(value) && Object.prototype.toString.call(value) === '[object Array]';
}
exports.isArray = isArray;
function isModule(value) {
    return isObjectOrArray(value) && Object.prototype.toString.call(value) === '[object Module]';
}
exports.isModule = isModule;
function isFunction(value) {
    return typeof value === 'function';
}
exports.isFunction = isFunction;
function isSpace(value) {
    return value === null || value === undefined;
}
exports.isSpace = isSpace;
