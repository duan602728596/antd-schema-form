"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var type_1 = require("../../utils/type");
exports.minErrStr = '数量必须大于等于';
exports.maxErrStr = '数量必须小于等于';
function createArrayRules(root, required) {
    var minItems = root.minItems, maxItems = root.maxItems, $minItemsMessage = root.$minItemsMessage, $maxItemsMessage = root.$maxItemsMessage;
    var rules = [];
    // 数组内元素的数量最少值
    if (!type_1.isSpace(minItems) && type_1.isNumber(minItems)) {
        rules.push({
            validator: function (rule, value, callback) {
                if (minItems !== undefined && value && value.length < minItems)
                    callback(rule.message);
                else
                    callback();
            },
            message: $minItemsMessage || "" + exports.minErrStr + minItems
        });
    }
    // 数组内元素的数量最大值
    if (!type_1.isSpace(maxItems) && type_1.isNumber(maxItems)) {
        rules.push({
            validator: function (rule, value, callback) {
                if (maxItems !== undefined && value && value.length > maxItems)
                    callback(rule.message);
                else
                    callback();
            },
            message: $maxItemsMessage || "" + exports.maxErrStr + maxItems
        });
    }
    return rules;
}
exports.default = createArrayRules;
