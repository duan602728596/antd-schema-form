import { transform, isPlainObject } from 'lodash-es';

/**
 * object对象，格式化成表单需要的值
 * @param { object } obj: 对象
 * @param { string } basicId: 前置id
 */
function getObjectFromValue(obj: object, basicId?: string): object {
  return transform(obj, function(result: object, value: any, key: string): void {
    if (isPlainObject(value) && !value._isAMomentObject) {
      const bid: string = basicId ? `${ basicId }/${ key }/properties` : `${ key }/properties`;
      const res: object = getObjectFromValue(value, bid);

      Object.assign(result, { ...value, ...res });
    } else {
      result[basicId ? `${ basicId }/${ key }` : key] = value;
    }
  }, {});
}

export default getObjectFromValue;