import stringJson from './string.json';
import numberJson from './number.json';
import booleanJson from './boolean.json';
import objectJson from './object.json';
import arraon from './array.json';
import stringJsonZhCN from './string-zhCN.json';
import numberJsonZhCN from './number-zhCN.json';
import booleanJsonZhCN from './boolean-zhCN.json';
import objectJsonZhCN from './object-zhCN.json';
import arrayJsonZhCN from './array-zhCN.json';

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