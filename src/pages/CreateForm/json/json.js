import stringJson from './string.json' assert { type: 'json' };
import numberJson from './number.json' assert { type: 'json' };
import booleanJson from './boolean.json' assert { type: 'json' };
import objectJson from './object.json' assert { type: 'json' };
import arrayJson from './array.json' assert { type: 'json' };
import stringJsonZhCN from './string-zhCN.json' assert { type: 'json' };
import numberJsonZhCN from './number-zhCN.json' assert { type: 'json' };
import booleanJsonZhCN from './boolean-zhCN.json' assert { type: 'json' };
import objectJsonZhCN from './object-zhCN.json' assert { type: 'json' };
import arrayJsonZhCN from './array-zhCN.json' assert { type: 'json' };

export default {
  default: {
    string: stringJson,
    number: numberJson,
    boolean: booleanJson,
    object: objectJson,
    array: arrayJson
  },
  'zh-cn': {
    string: stringJsonZhCN,
    number: numberJsonZhCN,
    boolean: booleanJsonZhCN,
    object: objectJsonZhCN,
    array: arrayJsonZhCN
  }
};