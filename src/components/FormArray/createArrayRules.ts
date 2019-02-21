import { ValidationRule } from 'antd/lib/form';
import { isSpace, isNumber } from '../../utils/type';
import { ArrayItem } from '../../types';

function createArrayRules(root: ArrayItem, required: boolean): Array<ValidationRule> {
  const { minItems, maxItems, $minItemsMessage, $maxItemsMessage }: ArrayItem = root;
  const rules: ValidationRule[] = [];

  // 数组的数量最少值
  if (!isSpace(minItems) && isNumber(minItems)) {
    rules.push({
      validator: (rule: ValidationRule, value: Array<any>, callback: Function): void => {
        if (minItems !== undefined && value && value.length < minItems) callback(rule.message);
        else callback();
      },
      message: $minItemsMessage || `数组内实例的数量必须大于等于${ minItems }`
    });
  }

  // 数组的数量最大值
  if (!isSpace(maxItems) && isNumber(maxItems)) {
    rules.push({
      validator: (rule: ValidationRule, value: Array<any>, callback: Function): void => {
        if (maxItems !== undefined && value && value.length > maxItems) callback(rule.message);
        else callback();
      },
      message: $maxItemsMessage || `数组内实例的数量必须小于等于${ maxItems }`
    });
  }

  return rules;
}

export default createArrayRules;