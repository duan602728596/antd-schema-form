import { ValidationRule } from 'antd/lib/form';
import { isSpace, isNumber } from '../../utils/type';
import { NumberItem } from '../../types';

function createNumberRules(root: NumberItem, required: boolean, isInteger: boolean): Array<ValidationRule> {
  const {
    $required, $requiredMessage, minimum, maximum, $minimumMessage, $maximumMessage, $integer, $integerMessage,
    $enumMessage
  }: NumberItem = root;
  const enums: string[] | undefined = root.enum;
  const rules: ValidationRule[] = [];

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
  if (!isSpace(minimum) && isNumber(minimum)) {
    rules.push({
      validator: (rule: ValidationRule, value: number, callback: Function): void => {
        // @ts-ignore
        if (value < minimum) callback(rule.message);
        else callback();
      },
      message: $minimumMessage || `值必须大于${ minimum }`
    });
  }

  // 最大值
  if (!isSpace(maximum) && isNumber(maximum)) {
    rules.push({
      validator: (rule: ValidationRule, value: number, callback: Function): void => {
        // @ts-ignore
        if (value > maximum) callback(rule.message);
        else callback();
      },
      message: $maximumMessage || `值必须小于${ maximum }`
    });
  }

  return rules;
}

export default createNumberRules;