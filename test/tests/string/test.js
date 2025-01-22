import { renderDefault, renderTextArea, renderSelect, renderRadio, renderDate } from './componentRendering';
import {
  componentHasDefaultValue,
  componentHastValue,
  selectHasDefaultValue,
  selectHasValue,
  radioHasDefaultValue,
  radioHastValue,
  dateHasDefaultValue,
  dateHasValue,
  theValueOfTheComponentOverridesTheDefaultValue
} from './hasValue';
import { componentReadOnly, componentPlaceholder, selectComponentPlaceholder, passwordComponentType } from './attrs';
import {
  componentNoverification, componentRequired, componentEnum, componentMinLength, componentMaxLength, componentLength,
  componentPattern
} from './verification';

/* 字符串组件的测试用例 */
// 字符串组件
describe('string component', function() {
  /* 组件渲染 */
  describe('component rendering', function() {
    it('should render default component', renderDefault); // 渲染默认组件
    it('should render textarea', renderTextArea); // 渲染文本域
    it('should render select', renderSelect); // 渲染下拉框
    it('should render radio', renderRadio); // 渲染单选组件
    it('should render date', renderDate); // 渲染日期组件
  });

  /* 交互测试 */
  describe('interactive test', function() {
    // 有值
    describe('has value', function() {
      it('should component has default value', componentHasDefaultValue); // 组件有默认值
      it('should component has value', componentHastValue); // 组件有值
      it('should select has default value', selectHasDefaultValue); // 下拉框有默认值
      it('should select has value', selectHasValue); // 下拉框有值
      it('should radio has default value', radioHasDefaultValue); // 单选框有默认值
      it('should radio has value', radioHastValue); // 单选框有值
      it('should date has default value', dateHasDefaultValue); // 日期选择器有默认值
      it('should date has value', dateHasValue); // 日期选择器有值
      // 组件的值会覆盖默认值
      it('should the value of the component overrides the default value', theValueOfTheComponentOverridesTheDefaultValue);
    });

    // 组件的属性
    describe('component properties', function() {
      it('should component read only', componentReadOnly); // 组件只读
      it('should component has placeholder', componentPlaceholder); // 组件的placeholder属性
      it('should select has placeholder', selectComponentPlaceholder); // select组件的placeholder属性
      it('should password has type', passwordComponentType); // password组件的type属性
    });

    // 表单验证
    describe('form validation', function() {
      it('should form value not verified and has value', componentNoverification); // 表单没有验证
      it('should form value must be required', componentRequired); // 表单必填
      it('should form value must be enumerated', componentEnum); // 组件的枚举
      it('should form value must has a minimum length', componentMinLength); // 组件值的最小长度
      it('should form value must has a maximum length ', componentMaxLength); // 组件值的最大长度
      it('should form value must has a fixed length', componentLength); // 组件的固定长度
      it('should form value must be verified with a regular', componentPattern); // 组件的正则表达式验证
    });
  });
});