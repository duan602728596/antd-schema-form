import describe from 'describe';
import it from 'it';
import { renderDefault, renderSwitch } from './componentRender';
import { componentHasDefaultValue, componentHastValue, switchHasDefaultValue, switchHasValue } from './hasValue';

/* 布尔类型组件的测试用例 */
describe('boolean component', function() {
  /* 组件渲染 */
  describe('component rendering', function() {
    it('should render default component', renderDefault); // 渲染默认组件
    it('should render switch', renderSwitch); // 渲染开关组件
  });

  /* 交互测试 */
  describe('interactive test', function() {
    it('should component has default value ', componentHasDefaultValue); // 组件有默认值
    it('should component has value', componentHastValue); // 组件有值
    it('should switch has default value', switchHasDefaultValue); // 开关有默认值
    it('should switch has value', switchHasValue); // 开关有值
  });
});