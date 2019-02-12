// @flow
import defaultLang from './languagePack/default.json';
import zhCNLang from './languagePack/zh-CN.json';

// 语言包，key值小写
const languagePack: Object = {
  default: defaultLang,
  'zh-cn': zhCNLang
};

export default languagePack;