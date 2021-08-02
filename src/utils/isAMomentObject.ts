import { isPlainObject } from './lodash';

/* 判断是否为moment对象或者是dayjs对象 */
function isAMomentObject(value: any): boolean {
  if (!isPlainObject(value)) {
    return false;
  }

  // moment - dayjs
  return value._isAMomentObject === true || (value.format && value.$d);
}

export default isAMomentObject;