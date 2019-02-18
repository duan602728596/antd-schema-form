import describe from 'describe';
import it from 'it';
import { renderDefault, renderSwitch } from './componentRender';
import { componentHasDefaultValue, componentHastValue, switchHasDefaultValue, switchHasValue } from './hasValue';

describe('布尔类型组件', function() {
  /* 组件渲染 */
  describe('组件渲染', function() {
    it('渲染默认组件', renderDefault);
    it('渲染开关组件', renderSwitch);
  });

  /* 交互测试 */
  describe('交互测试', function() {
    it('组件有默认值', componentHasDefaultValue);
    it('组件有值', componentHastValue);
    it('开关有默认值', switchHasDefaultValue);
    it('开关有值', switchHasValue);
  });
});