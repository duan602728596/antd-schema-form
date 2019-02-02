import { ValidationRule } from 'antd/lib/form';
import { isSpace, isNumber, isString } from '../../utils/type';
import { StringItem } from '../../types';

function createStringRules(root: StringItem, required: boolean): Array<ValidationRule>{
  const {
    $required, $requiredMessage, pattern, $patternOption, $patternMessage, minLength, maxLength, $minLengthMessage,
    $maxLengthMessage, $length, $lengthMessage, $enumMessage
  } = root;
  const enums: string[] = root.enum;
  const rules: ValidationRule[] = [];

  // 判断表单是否必填
  if($required === true || required === true){
    rules.push({
      required: true,
      message: $requiredMessage || '该选项为必填项',
      whitespace: true
    });
  }

  // 枚举
  if(enums){
    rules.push({
      type: 'enum',
      enum: enums,
      message: $enumMessage || `值不在集合 [${ enums.join(', ') }] 里`
    });
  }

  // 字段的最小长度
  if(!isSpace(minLength) && isNumber(minLength)){
    rules.push({
      min: minLength,
      message: $minLengthMessage || `字段的最小长度为${ minLength }`
    });
  }

  // 字段的最大长度
  if(!isSpace(maxLength)){
    rules.push({
      max: maxLength,
      message: $maxLengthMessage || `字段的最大长度为${ maxLength }`
    });
  }

  // 字段的长度
  if(!isSpace($length) && isNumber($length)){
    rules.push({
      len: $length,
      message: $lengthMessage || `字段的长度为${ $length }`
    });
  }

  // 正则表达式
  if(pattern){
    const reg: RegExp = new RegExp(pattern, isString($patternOption) ? $patternOption : undefined);

    rules.push({
      pattern: reg,
      message: $patternMessage || `数据格式错误，格式必须为：/${ pattern }/${ isString($patternOption) ? $patternOption : '' }`
    });
  }

  return rules;
}

export default createStringRules;