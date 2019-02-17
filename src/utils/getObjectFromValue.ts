import { isObject } from './type';

/**
 * object对象，格式化成表单需要的值
 * @param { object } obj: 对象
 * @param { string } basicId: 前置id
 */
function getObjectFromValue(obj: object, basicId?: string): object {
  let value: object = {};

  for (const key in obj) {
    const item: any = obj[key];

    if (isObject(item) && !item._isAMomentObject) {
      const result: object = getObjectFromValue(
        item,
        basicId ? `${ basicId }/${ key }/properties` : `${ key }/properties`
      );

      value = { ...value, ...result };
    } else {
      value[basicId ? `${ basicId }/${ key }` : key] = item;
    }
  }

  return value;
}

export default getObjectFromValue;