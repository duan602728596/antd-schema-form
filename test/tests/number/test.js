import describe from 'describe';
import it from 'it';
import { renderDefault, renderRadio } from './componentRendering';
import {
  componentHasDefaultValue, componentHastValue, radioHasDefaultValue, radioHastValue,
  theValueOfTheComponentOverridesTheDefaultValue
} from './hasValue';
import { componentPlaceholder, componentReadOnly } from './attrs';
import {
  componentNoverification, componentRequired, componentEnum, componentInteger, componentIntegerTrue, componentMinimum,
  componentMinimumExclusiveMinimum, componentMaximum, componentMaximumExclusiveMaximum
} from './verification';

describe('数字类型组件', function(): void{
  /* 组件渲染 */
  describe('组件渲染', function(): void{
    it('渲染默认组件', renderDefault);
    it('渲染单选组件', renderRadio);
  });

  /* 交互测试 */
  describe('交互测试', function(): void{
    it('组件有默认值', componentHasDefaultValue);
    it('组件有值', componentHastValue);
    it('单选框有默认值', radioHasDefaultValue);
    it('单选框有值', radioHastValue);
    it('组件的值会覆盖默认值', theValueOfTheComponentOverridesTheDefaultValue);
  });

  describe('组件的属性', function(): void{
    it('组件只读', componentReadOnly);
    it('组件的placeholder属性', componentPlaceholder);
  });

  describe('表单验证', function(): void{
    it('组件值没有验证', componentNoverification);
    it('表单必填', componentRequired);
    it('组件的枚举', componentEnum);
    it('组件值是整数', componentInteger);
    it('组件值是整数', componentIntegerTrue);
    it('组件的最小值', componentMinimum);
    it('组件的最小值（不包括配置的数）', componentMinimumExclusiveMinimum);
    it('组件的最大值', componentMaximum);
    it('组件的最大值（不包括配置的数）', componentMaximumExclusiveMaximum);
  });
});