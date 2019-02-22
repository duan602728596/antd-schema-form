import describe from 'describe';
import it from 'it';
import { renderDefault, renderSelectMultiple, renderSelectTags, renderCheckboxGroup } from './componentRender';
import {
  componentHasDefaultValue, componentHasValue, componentItemsIsStringOrNumber, CheckboxGroupHastDefaultValue,
  CheckboxGroupHastValue
} from './hasValue';
import { tableComponentMinItems, tableComponentMaxItems } from './verification';

describe('数组组件', function() {
  /* 组件渲染 */
  describe('组件渲染', function() {
    it('渲染默认组件', renderDefault);
    it('渲染Select的multiple模式', renderSelectMultiple);
    it('渲染Select的tags模式', renderSelectTags);
    it('渲染多选组件', renderCheckboxGroup);
  });

  /* 交互测试 */
  describe('交互测试', function() {
    describe('有值', function() {
      it('组件有默认值', componentHasDefaultValue);
      it('组件有值', componentHasValue);
      it('数组内为字符串或数字', componentItemsIsStringOrNumber);
      it('多选框有默认值', CheckboxGroupHastDefaultValue);
      it('多选框有值', CheckboxGroupHastValue);
    });
  });

  /* 表单验证 */
  describe('表单验证', function() {
    it('数组元素最小数量验证', tableComponentMinItems);
    it('数组元素最大数量验证', tableComponentMaxItems);
  });
});