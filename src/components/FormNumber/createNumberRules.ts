import { ValidationRule } from 'antd/lib/form';
import { isNil, isNumber } from '../../utils/type';
import { NumberItem } from '../../types';

function createNumberRules(root: NumberItem, required: boolean, isInteger: boolean): Array<ValidationRule> {
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
      message: $requiredMessage || '该选项为必填项'
    });
  }

  // 枚举
  if (enums) {
    rules.push({
      type: 'enum',
      enum: enums,
      message: $enumMessage || `值不在集合 [${ enums.join(', ') }] 里`
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
      message: $minimumMessage || `值必须大于等于${ minimum }`
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
      message: $maximumMessage || `值必须小于等于${ maximum }`
    });
  }

  return rules;
}

export default createNumberRules;