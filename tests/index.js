import mocha from 'mocha';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

// 初始化测试配置项
mocha.setup('bdd');
mocha.timeout(180000);
Enzyme.configure({
  adapter: new Adapter()
});

(async function() {
  await Promise.all([
    // 通用函数测试
    import('./tests/function/test'),
    // string类型组件测试
    import('./tests/string/test'),
    // number类型组件测试
    import('./tests/number/test'),
    // boolean类型组件测试
    import('./tests/boolean/test'),
    // array类型组件测试
    import('./tests/array/test'),
    // object类型组件测试
    import('./tests/object/test')
  ]);

  mocha.run();
})();