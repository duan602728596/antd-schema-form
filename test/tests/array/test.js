import { renderDefault, renderSelectMultiple, renderSelectTags, renderCheckboxGroup } from './componentRender';
import {
  componentHasDefaultValue,
  componentHasValue,
  componentItemsIsStringOrNumber,
  CheckboxGroupHastDefaultValue,
  CheckboxGroupHastValue
} from './hasValue';
import { tableComponentMinItems, tableComponentMaxItems } from './verification';

/* 数组组件的测试用例 */
describe('array component', function() {
  /* 组件渲染 */
  describe('component rendering', function() {
    it('should render default component', renderDefault); // 渲染默认组件
    it('should render Select multiple mode', renderSelectMultiple); // 渲染Select的multiple模式
    it('should render Select tags mode', renderSelectTags); // 渲染Select的tags模式
    it('should render checkbox group', renderCheckboxGroup); // 渲染多选组件
  });

  /* 交互测试 */
  describe('interactive test', function() {
    // 有值
    describe('has value', function() {
      it('should component has default value', componentHasDefaultValue); // 组件有默认值
      it('should component has value', componentHasValue); // 组件有值
      it('should inside the array is a string or number', componentItemsIsStringOrNumber); // 数组内为字符串或数字
      it('should checkbox group has default value', CheckboxGroupHastDefaultValue); // 多选框有默认值
      it('should checkbox group has value', CheckboxGroupHastValue); // 多选框有值
    });
  });

  /* 表单验证 */
  describe('form validation', function() {
    it('should the minimum number of array items', tableComponentMinItems); // 数组元素最小数量验证
    it('should the maximum number of array items', tableComponentMaxItems); // 数组元素最大数量验证
  });
});