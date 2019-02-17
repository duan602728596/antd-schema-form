import { SchemaItem } from '../types';

/**
 * 获取schema.json下所有的key
 * @param { SchemaItem } item: 对象
 */

function getKeysFromObject(item: SchemaItem): Array<string> {
  const idArr: string[] = [];

  if (item.type === 'object') {
    for (const key in item.properties) {
      const objIdArr: string[] = getKeysFromObject(item.properties[key]);

      idArr.push(...objIdArr);
    }
  } else {
    const id: string = item.id;

    idArr.push(id);
  }

  return idArr;
}

export default getKeysFromObject;