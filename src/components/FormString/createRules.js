import { isSpace, isNumber, isString } from '../../utils/type';

function createRules(root: Object): Array{
  const {
    pattern, minLength, maxLength, required, _length, _patternOption, _lengthMessage, _requiredMessage,
    _patternMessage, _minLengthMessage, _maxLengthMessage
  }: {
    pattern: ?string,
    minLength: ?number,
    maxLength: ?number,
    required: ?boolean,
    _length: ?number,
    _patternOption: ?string,
    _lengthMessage: ?string,
    _requiredMessage: ?string,
    _patternMessage: ?string,
    _minLengthMessage: ?string,
    _maxLengthMessage: ?string
  } = root;
  const rules: [] = [];

  // 判断表单是否必填
  if(required === true){
    rules.push({
      required: true,
      message: _requiredMessage || '该选项为必填项'
    });
  }

  // 字段的最小长度
  if(!isSpace(minLength) && isNumber(minLength)){
    rules.push({
      min: minLength,
      message: _minLengthMessage || `字段的最小长度为${ minLength }`
    });
  }

  // 字段的最大长度
  if(!isSpace(maxLength)){
    rules.push({
      max: maxLength,
      message: _maxLengthMessage || `字段的最大长度为${ maxLength }`
    });
  }

  // 字段的长度
  if(!isSpace(_length) && isNumber(_length)){
    rules.push({
      len: _length,
      message: _lengthMessage || `字段的长度为${ _length }`
    });
  }

  // 正则表达式
  if(pattern){
    const reg: RegExp = new RegExp(pattern, isString(_patternOption) ? _patternOption : undefined);

    rules.push({
      pattern: reg,
      message: _patternMessage || `数据格式错误，格式必须为：/${ pattern }/${ isString(_patternOption) ? _patternOption : '' }`
    });
  }

  return rules;
}

export default createRules;