import { isObject } from './type';

/**
 * 格式化数据
 * @param { Object } value: 表单值
 * @param { string } basicId: 格式化数据的id
 */
export function formatValueBeforeGetValue(value: Object, basicId: string): Object{
  const reg: RegExp = new RegExp(`^${ basicId.replace('$', '\\$') }/`);
  const formatValue: Object = {};

  for(const key: string in value){
    const formatKey: string = key.replace(reg, '');

    formatValue[formatKey] = value[key];
  }

  return formatValue;
}

/**
 * 从form获取到的表单的值，格式化成object对象
 * @param { Object } value: 表单值
 */
function getValueFromObject(value: Object): Object{
  const obj: Object = {};

  for(const key: string in value){
    const keyArr: string[] = key.split('/');
    const len: number = keyArr.length;
    let index: number = 0;
    let point: Object = obj;

    while(index < len){
      // 判断是否为对象
      const nowKey: string = keyArr[index];
      const nextKey: ?string = keyArr[index + 1];

      if(nextKey && nextKey === 'properties'){
        if(!isObject(point[nowKey])) point[nowKey] = {};

        point = point[nowKey];
        index += 2;
      }else if(!nextKey){
        point[nowKey] = value[key];
        break;
      }else if(nextKey && nextKey === 'items'){
        break;
      }else{
        index += 1;
      }
    }
  }

  return obj;
}

export default getValueFromObject;