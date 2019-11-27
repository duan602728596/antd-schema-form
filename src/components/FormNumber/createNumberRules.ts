import isNil from 'lodash-es/isNil';
import isNumber from 'lodash-es/isNumber';
import { ValidationRule } from 'antd/lib/form';
import template from '../../utils/template';
import { NumberItem } from '../../types';

function createNumberRules(languagePack: any, root: NumberItem, required: boolean, isInteger: boolean): Array<ValidationRule> {
  const {
    $required, $requiredMessage, minimum, maximum, $minimumMessage, $maximumMessage, $integer, $integerMessage,
    $enumMessage
  }: NumberItem = root;
  const enums: string[] | undefined = root.enum;
  const rules: ValidationRule[] = [];

  // 判断表单是否必填
  if ($required || required) {
    rules.push({
      required: true,
      message: $requiredMessage || languagePack.rules.required
    });
  }

  // 枚举
  if (enums) {
    rules.push({
      type: 'enum',
      enum: enums,
      message: template($enumMessage || languagePack.rules.enum, {
        '0': `[${ enums.join(', ') }]`
      })
    });
  }

  // 整数
  if (isInteger || $integer) {
    rules.push({
      type: 'integer',
      message: $integerMessage || languagePack.rules.number.integer
    });
  }

  // 最小值
  if (!isNil(minimum) && isNumber(minimum)) {
    rules.push({
      validator: (rule: ValidationRule, value: number | string, callback: Function): void => {
        if (minimum !== undefined) {
          // 当表单没有值时，value的type为string
          if (typeof value === 'number' && value < minimum) {
            callback(rule.message);
          } else {
            callback();
          }
        } else {
          callback();
        }
      },
      message: template($minimumMessage || languagePack.rules.number.minimum, {
        '0': minimum
      })
    });
  }

  // 最大值
  if (!isNil(maximum) && isNumber(maximum)) {
    rules.push({
      validator: (rule: ValidationRule, value: number | string, callback: Function): void => {
        if (maximum !== undefined) {
          // 当表单没有值时，value的type为string
          if (typeof value === 'number' && value > maximum) {
            callback(rule.message);
          } else {
            callback();
          }
        } else {
          callback();
        }
      },
      message: template($maximumMessage || languagePack.rules.number.maximum, {
        '0': maximum
      })
    });
  }

  return rules;
}

export default createNumberRules;