import defaultLang from './languagePack/default.json' assert { type: 'json' };
import zhCNLang from './languagePack/zh-CN.json' assert { type: 'json' };

// 语言包，key值小写
const languagePack = {
  default: defaultLang,
  'zh-cn': zhCNLang
};

export default languagePack;