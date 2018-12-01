import { isSpace, isNumber } from '../../utils/type';

function judgeMinimum(value: number, minimum: number, exclusiveMinimum: boolean): boolean{
  if(exclusiveMinimum === true) return value <= minimum;
  else return value < minimum;
}

function judgeMaximum(value: number, maximum: number, exclusiveMaximum: boolean): boolean{
  if(exclusiveMaximum === true) return value >= maximum;
  else return value > maximum;
}

function createNumberRules(root: Object, required: boolean, isInteger: boolean): Array{
  const {
    $required, $requiredMessage, minimum, maximum, exclusiveMinimum, exclusiveMaximum, $minimumMessage, $maximumMessage,
    $integer, $integerMessage, $enumMessage
  }: {
    $required: ?boolean,
    $requiredMessage: ?string,
    minimum: ?number,
    maximum: ?number,
    exclusiveMinimum: ?boolean,
    exclusiveMaximum: ?boolean,
    $minimumMessage: ?string,
    $maximumMessage: ?string,
    $integerMessage: ?string,
    $enumMessage: ?string
  } = root;
  const enums: ?Array<string> = root?.enum;
  const rules: [] = [];

  // 判断表单是否必填
  if($required === true || required === true){
    rules.push({
      required: true,
      message: $requiredMessage || '该选项为必填项'
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
  if(isInteger || $integer){
    rules.push({
      type: 'integer',
      message: $integerMessage || '值必须是整数'
    });
  }

  // 最小值
  if(!isSpace(minimum) && isNumber(minimum)){
    rules.push({
      validator: (rule: Object, value: number, callback: Function): void=>{
        if(judgeMinimum(value, minimum, exclusiveMinimum)) callback(rule.message);
        else callback();
      },
      message: $minimumMessage || `值必须大于${ exclusiveMinimum === true ? '' : '等于' }${ minimum }`
    });
  }

  // 最大值
  if(!isSpace(maximum) && isNumber(maximum)){
    rules.push({
      validator: (rule: Object, value: number, callback: Function): void=>{
        if(judgeMaximum(value, maximum, exclusiveMaximum)) callback(rule.message);
        else callback();
      },
      message: $maximumMessage || `值必须小于${ exclusiveMaximum === true ? '' : '等于' }${ maximum }`
    });
  }

  return rules;
}

export default createNumberRules;