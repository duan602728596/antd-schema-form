import { renderDefault, renderRadio } from './componentRendering';
import {
  componentHasDefaultValue,
  componentHastValue,
  radioHasDefaultValue,
  radioHastValue,
  theValueOfTheComponentOverridesTheDefaultValue
} from './hasValue';
import { componentPlaceholder, componentReadOnly } from './attrs';
import {
  componentNoverification,
  componentRequired,
  componentEnum,
  componentInteger,
  componentIntegerTrue,
  componentMinimum,
  componentMaximum
} from './verification';

/* 数字类型组件的测试用例 */
describe('number component', function() {
  /* 组件渲染 */
  describe('component rendering', function() {
    it('should render default component', renderDefault); // 渲染默认组件
    it('should render radio', renderRadio); // 渲染单选组件
  });

  /* 交互测试 */
  describe('interactive test', function() {
    it('should component has default value', componentHasDefaultValue); // 组件有默认值
    it('should component has value', componentHastValue); // 组件有值
    it('should select has default value', radioHasDefaultValue); // 单选框有默认值
    it('should select has value', radioHastValue); // 单选框有值
    // 组件的值会覆盖默认值
    it('should the value of the component overrides the default value', theValueOfTheComponentOverridesTheDefaultValue);
  });

  /* 组件的属性 */
  describe('component properties', function() {
    it('should component read only', componentReadOnly); // 组件只读
    it('should component has placeholder', componentPlaceholder); // 组件的placeholder属性
  });

  /* 表单验证 */
  describe('form validation', function() {
    it('should form value not verified', componentNoverification); // 组件值没有验证
    it('should form value must be required', componentRequired); // 表单必填
    it('should form value must be enumerated', componentEnum); // 组件的枚举
    it('should form value must be integer', componentInteger); // 组件值是整数
    it('should form value must be integer', componentIntegerTrue); // 组件值是整数
    it('should form value must has minimum value', componentMinimum); // 组件的最小值
    it('should form value must has maximum value', componentMaximum); // 组件的最大值
  });
});