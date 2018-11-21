import { isSpace, isNumber } from '../../utils/type';

function createNumberRules(root: Object, required: boolean, isInteger: boolean): Array{
  const {
    minimum, maximum, $required, $enumMessage, $requiredMessage, $minimumLengthMessage,
    $maximumMessage, $integerMessage
  }: {
    minimum: ?number,
    maximum: ?number,
    $required: ?boolean,
    $enumMessage: ?string,
    $requiredMessage: ?string,
    $minimumLengthMessage: ?string,
    $maximumMessage: ?string,
    $integerMessage: ?string
  } = root;
  const enums: ?Array<string> = root?.enum;
  const rules: [] = [];

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

  // 整数
  if(isInteger){
    rules.push({
      type: 'integer',
      message: $integerMessage || '值必须是整数'
    });
  }

  // 最小值
  if(!isSpace(minimum) && isNumber(minimum)){
    rules.push({
      validator: (rule: Object, value: number, callback: Function): void=>{
        if(value < minimum) callback(rule.message);
        else callback();
      },
      message: $minimumLengthMessage || `值必须大于等于${ minimum }`
    });
  }

  // 最大值
  if(!isSpace(maximum) && isNumber(maximum)){
    rules.push({
      validator: (rule: Object, value: number, callback: Function): void=>{
        if(value > maximum) callback(rule.message);
        else callback();
      },
      message: $maximumMessage || `值必须小于等于${ maximum }`
    });
  }

  return rules;
}

export default createNumberRules;