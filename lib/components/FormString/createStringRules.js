"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var type_1 = require("../../utils/type");
function createStringRules(root, required) {
    var $required = root.$required, $requiredMessage = root.$requiredMessage, pattern = root.pattern, $patternOption = root.$patternOption, $patternMessage = root.$patternMessage, minLength = root.minLength, maxLength = root.maxLength, $minLengthMessage = root.$minLengthMessage, $maxLengthMessage = root.$maxLengthMessage, $length = root.$length, $lengthMessage = root.$lengthMessage, $enumMessage = root.$enumMessage;
    var enums = root.enum;
    var rules = [];
    // 判断表单是否必填
    if ($required === true || required === true) {
        rules.push({
            required: true,
            message: $requiredMessage || '该选项为必填项',
            whitespace: true
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
    // 字段的最小长度
    if (!type_1.isSpace(minLength) && type_1.isNumber(minLength)) {
        rules.push({
            min: minLength,
            message: $minLengthMessage || "\u5B57\u6BB5\u7684\u6700\u5C0F\u957F\u5EA6\u4E3A" + minLength
        });
    }
    // 字段的最大长度
    if (!type_1.isSpace(maxLength)) {
        rules.push({
            max: maxLength,
            message: $maxLengthMessage || "\u5B57\u6BB5\u7684\u6700\u5927\u957F\u5EA6\u4E3A" + maxLength
        });
    }
    // 字段的长度
    if (!type_1.isSpace($length) && type_1.isNumber($length)) {
        rules.push({
            len: $length,
            message: $lengthMessage || "\u5B57\u6BB5\u7684\u957F\u5EA6\u4E3A" + $length
        });
    }
    // 正则表达式
    if (pattern) {
        var reg = new RegExp(pattern, type_1.isString($patternOption) ? $patternOption : undefined);
        rules.push({
            pattern: reg,
            message: $patternMessage || "\u6570\u636E\u683C\u5F0F\u9519\u8BEF\uFF0C\u683C\u5F0F\u5FC5\u987B\u4E3A\uFF1A/" + pattern + "/" + (type_1.isString($patternOption) ? $patternOption : '')
        });
    }
    return rules;
}
exports.default = createStringRules;
