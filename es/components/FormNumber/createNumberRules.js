import { isSpace, isNumber } from '../../utils/type';
function createNumberRules(root, required, isInteger) {
    const { $required, $requiredMessage, minimum, maximum, $minimumMessage, $maximumMessage, $integer, $integerMessage, $enumMessage } = root;
    const enums = root.enum;
    const rules = [];
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
            message: $enumMessage || `值不在集合 [${enums.join(', ')}] 里`
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
    if (!isSpace(minimum) && isNumber(minimum)) {
        rules.push({
            validator: (rule, value, callback) => {
                if (minimum !== undefined && value < minimum)
                    callback(rule.message);
                else
                    callback();
            },
            message: $minimumMessage || `值必须大于${minimum}`
        });
    }
    // 最大值
    if (!isSpace(maximum) && isNumber(maximum)) {
        rules.push({
            validator: (rule, value, callback) => {
                if (maximum !== undefined && value > maximum)
                    callback(rule.message);
                else
                    callback();
            },
            message: $maximumMessage || `值必须小于${maximum}`
        });
    }
    return rules;
}
export default createNumberRules;
