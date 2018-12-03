import mocha from 'mocha';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// 初始化测试配置项
mocha.setup('bdd');
mocha.timeout(180000);
Enzyme.configure({
  adapter: new Adapter()
});

(async function(): void{
  await Promise.all([
    import('./tests/string/test'),
    import('./tests/number/test')
  ]);

  mocha.run();
})();