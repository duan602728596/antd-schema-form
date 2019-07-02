import isNil from 'lodash-es/isNil';
import isNumber from 'lodash-es/isNumber';
import { ValidationRule } from 'antd/lib/form';
import template from '../../utils/template';
import { ArrayItem } from '../../types';

function createArrayRules(languagePack: any, root: ArrayItem, required: boolean): Array<ValidationRule> {
  const { minItems, maxItems, $minItemsMessage, $maxItemsMessage }: ArrayItem = root;
  const rules: ValidationRule[] = [];

  // 数组内元素的数量最少值
  if (!isNil(minItems) && isNumber(minItems)) {
    rules.push({
      validator: (rule: ValidationRule, value: Array<any>, callback: Function): void => {
        if (minItems !== undefined && value && value.length < minItems) callback(rule.message);
        else callback();
      },
      message: template($minItemsMessage || languagePack.rules.array.minItems, {
        '0': minItems
      })
    });
  }

  // 数组内元素的数量最大值
  if (!isNil(maxItems) && isNumber(maxItems)) {
    rules.push({
      validator: (rule: ValidationRule, value: Array<any>, callback: Function): void => {
        if (maxItems !== undefined && value && value.length > maxItems) callback(rule.message);
        else callback();
      },
      message: template($maxItemsMessage || languagePack.rules.array.maxItems, {
        '0': maxItems
      })
    });
  }

  return rules;
}

export default createArrayRules;