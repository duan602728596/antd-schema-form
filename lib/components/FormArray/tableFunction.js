"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 格式化数据，使值满足antd的props-type
 * @param { Array } rawArray: 原数据
 */
function formatTableValue(rawArray) {
    var result = [];
    for (var _i = 0, rawArray_1 = rawArray; _i < rawArray_1.length; _i++) {
        var item = rawArray_1[_i];
        result.push({ value: item });
    }
    return result;
}
exports.formatTableValue = formatTableValue;
/**
 * 对数组内的index排序，从大到小
 */
function sortIndex(rawArray) {
    if (rawArray.length <= 1)
        return rawArray;
    for (var i = 0, j = rawArray.length; i < j; i++) {
        var max = i;
        for (var k = i + 1; k < j; k++) {
            if (rawArray[k] > rawArray[max])
                max = k;
        }
        if (max !== i) {
            var middle = rawArray[max];
            rawArray.splice(max, 1);
            rawArray.splice(i, 0, middle);
        }
    }
    return rawArray;
}
exports.sortIndex = sortIndex;
