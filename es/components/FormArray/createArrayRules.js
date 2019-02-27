import { isSpace, isNumber } from '../../utils/type';
export const minErrStr = '数量必须大于等于';
export const maxErrStr = '数量必须小于等于';
function createArrayRules(root, required) {
    const { minItems, maxItems, $minItemsMessage, $maxItemsMessage } = root;
    const rules = [];
    // 数组内元素的数量最少值
    if (!isSpace(minItems) && isNumber(minItems)) {
        rules.push({
            validator: (rule, value, callback) => {
                if (minItems !== undefined && value && value.length < minItems)
                    callback(rule.message);
                else
                    callback();
            },
            message: $minItemsMessage || `${minErrStr}${minItems}`
        });
    }
    // 数组内元素的数量最大值
    if (!isSpace(maxItems) && isNumber(maxItems)) {
        rules.push({
            validator: (rule, value, callback) => {
                if (maxItems !== undefined && value && value.length > maxItems)
                    callback(rule.message);
                else
                    callback();
            },
            message: $maxItemsMessage || `${maxErrStr}${maxItems}`
        });
    }
    return rules;
}
export default createArrayRules;
