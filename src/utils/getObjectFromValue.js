import { isObject } from './type';

/**
 * object对象，格式化成表单的值
 * @param { Object } obj: 对象
 * @param { ?string } basicId: 前置id
 */
function getObjectFromValue(obj: Object, basicId: ?string): Object{
  let value: Object = {};

  for(const key: string in obj){
    const item: any = obj[key];

    if(isObject(item)){
      const result: Object = getObjectFromValue(
        item,
        basicId ? `${ basicId }/${ key }/properties` : `${ key }/properties`
      );

      value = { ...value, ...result };
    }else{
      value[basicId ? `${ basicId }/${ key }` : key] = item;
    }
  }

  return value;
}

export default getObjectFromValue;