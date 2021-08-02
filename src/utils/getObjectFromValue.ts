import type { Store } from 'antd/es/form/interface';
import { isPlainObject } from './lodash';
import isAMomentObject from './isAMomentObject';

/**
 * object对象，格式化成表单需要的值
 * @param { object } obj: 对象
 * @param { string } basicId: 前置id
 */
function getObjectFromValue(obj: object, basicId?: string): Store {
  let value: Store = {};

  for (const key in obj) {
    const item: any = obj[key];

    if (isPlainObject(item) && !isAMomentObject(item)) {
      const bid: string = basicId ? `${ basicId }/${ key }/properties` : `${ key }/properties`;
      const result: object = getObjectFromValue(item, bid);

      value = { ...value, ...result };
    } else {
      value[basicId ? `${ basicId }/${ key }` : key] = item;
    }
  }

  return value;
}

export default getObjectFromValue;