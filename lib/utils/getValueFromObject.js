"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var type_1 = require("./type");
/**
 * 格式化数据
 * @param { object } value: 表单值
 * @param { string } basicId: 格式化数据的id
 */
function formatValueBeforeGetValue(value, basicId) {
    var reg = new RegExp("^" + basicId.replace('$', '\\$') + "/");
    var formatValue = {};
    for (var key in value) {
        var formatKey = key.replace(reg, '');
        formatValue[formatKey] = value[key];
    }
    return formatValue;
}
exports.formatValueBeforeGetValue = formatValueBeforeGetValue;
/**
 * 从form获取到的表单的值，格式化成object对象
 * @param { object } value: 表单值
 */
function getValueFromObject(value) {
    var obj = {};
    for (var key in value) {
        var keyArr = key.split('/');
        var len = keyArr.length;
        var index = 0;
        var point = obj;
        while (index < len) {
            // 判断是否为对象
            var nowKey = keyArr[index];
            var nextKey = keyArr[index + 1];
            if (nextKey && nextKey === 'properties') {
                if (!type_1.isObject(point[nowKey]))
                    point[nowKey] = {};
                point = point[nowKey];
                index += 2;
            }
            else if (!nextKey) {
                point[nowKey] = value[key];
                break;
            }
            else if (nextKey && nextKey === 'items') {
                break;
            }
            else {
                index += 1;
            }
        }
    }
    return obj;
}
exports.default = getValueFromObject;
