"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var type_1 = require("../../utils/type");
function createNumberRules(root, required, isInteger) {
    var $required = root.$required, $requiredMessage = root.$requiredMessage, minimum = root.minimum, maximum = root.maximum, $minimumMessage = root.$minimumMessage, $maximumMessage = root.$maximumMessage, $integer = root.$integer, $integerMessage = root.$integerMessage, $enumMessage = root.$enumMessage;
    var enums = root.enum;
    var rules = [];
    // 判断表单是否必填
    if ($required === true || required === true) {
        rules.push({
            required: true,
            message: $requiredMessage || '该选项为必填项'
        });
    }
    // 枚举
    if (enums) {
        rules.push({
            type: 'enum',
            enum: enums,
            message: $enumMessage || "\u503C\u4E0D\u5728\u96C6\u5408 [" + enums.join(', ') + "] \u91CC"
        });
    }
    // 整数
    if (isInteger || $integer) {
        rules.push({
            type: 'integer',
            message: $integerMessage || '值必须是整数'
        });
    }
    // 最小值
    if (!type_1.isSpace(minimum) && type_1.isNumber(minimum)) {
        rules.push({
            validator: function (rule, value, callback) {
                if (minimum !== undefined && value < minimum)
                    callback(rule.message);
                else
                    callback();
            },
            message: $minimumMessage || "\u503C\u5FC5\u987B\u5927\u4E8E" + minimum
        });
    }
    // 最大值
    if (!type_1.isSpace(maximum) && type_1.isNumber(maximum)) {
        rules.push({
            validator: function (rule, value, callback) {
                if (maximum !== undefined && value > maximum)
                    callback(rule.message);
                else
                    callback();
            },
            message: $maximumMessage || "\u503C\u5FC5\u987B\u5C0F\u4E8E" + maximum
        });
    }
    return rules;
}
exports.default = createNumberRules;
