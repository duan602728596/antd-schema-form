import isNil from 'lodash-es/isNil';
import isNumber from 'lodash-es/isNumber';
import isString from 'lodash-es/isString';
import { ValidationRule } from 'antd/lib/form';
import { StringItem } from '../../types';

function createStringRules(languagePack: any, root: StringItem, required: boolean): Array<ValidationRule> {
  const {
    $required, $requiredMessage, pattern, $patternOption, $patternMessage, minLength, maxLength, $minLengthMessage,
    $maxLengthMessage, $length, $lengthMessage, $enumMessage
  }: StringItem = root;
  const enums: string[] | undefined = root.enum;
  const rules: ValidationRule[] = [];

  // 判断表单是否必填
  if ($required === true || required === true) {
    rules.push({
      required: true,
      message: $requiredMessage || languagePack.rules.required,
      whitespace: true
    });
  }

  // 枚举
  if (enums) {
    rules.push({
      type: 'enum',
      enum: enums,
      message: $enumMessage || `[${ enums.join(', ') }]${ languagePack.rules.enum }`
    });
  }

  // 字段的最小长度
  if (!isNil(minLength) && isNumber(minLength)) {
    rules.push({
      min: minLength,
      message: $minLengthMessage || `${ languagePack.rules.string.min }${ minLength }`
    });
  }

  // 字段的最大长度
  if (!isNil(maxLength)) {
    rules.push({
      max: maxLength,
      message: $maxLengthMessage || `${ languagePack.rules.string.max }${ maxLength }`
    });
  }

  // 字段的长度
  if (!isNil($length) && isNumber($length)) {
    rules.push({
      len: $length,
      message: $lengthMessage || `${ languagePack.rules.string.length }${ $length }`
    });
  }

  // 正则表达式
  if (pattern) {
    const reg: RegExp = new RegExp(pattern, isString($patternOption) ? $patternOption : undefined);

    rules.push({
      pattern: reg,
      message: $patternMessage || `${ languagePack.rules.string.pattern }/${ pattern }/${ isString($patternOption) ? $patternOption : '' }`
    });
  }

  return rules;
}

export default createStringRules;