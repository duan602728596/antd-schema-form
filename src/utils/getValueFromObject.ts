import type { Store } from 'antd/es/form/interface';
import { isPlainObject } from './lodash';

/**
 * 格式化数据
 * @param { Store } formValue: 表单值
 * @param { string } basicId: 格式化数据的id
 */
export function formatValueBeforeGetValue(formValue: Store, basicId: string): Store {
  const reg: RegExp = new RegExp(`^${ basicId.replace(/\$/g, '\\$') }/`);
  const result: object = {};

  for (const key in formValue) {
    const formatKey: string = key.replace(reg, '');

    result[formatKey] = formValue[key];
  }

  return result;
}

/**
 * 从form获取到的表单的值，格式化成object对象
 * @param { object } value: 表单值
 */
function getValueFromObject(value: Store): object {
  const obj: object = {};

  for (const key in value) {
    const keyArr: string[] = key.split('/');
    const len: number = keyArr.length;
    let index: number = 0;
    let point: object = obj;

    while (index < len) {
      // 判断是否为对象
      const nowKey: string = keyArr[index];
      const nextKey: string = keyArr[index + 1];

      if (nextKey && nextKey === 'properties') {
        if (!isPlainObject(point[nowKey])) point[nowKey] = {};

        point = point[nowKey];
        index += 2;
      } else if (!nextKey) {
        point[nowKey] = value[key];
        break;
      } else if (nextKey && nextKey === 'items') {
        break;
      } else {
        index += 1;
      }
    }
  }

  return obj;
}

export default getValueFromObject;