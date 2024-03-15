import type { SchemaItem } from '../types';

/**
 * 获取schema.json下所有的key
 * @param { SchemaItem } item - 对象
 */

function getKeysFromObject(item: SchemaItem): Array<string> {
  const idArr: string[] = [];

  if (item.type === 'object') {
    for (const key in item.properties) {
      const objIdArr: string[] = getKeysFromObject(item.properties[key]);

      idArr.push(...objIdArr);
    }

    // 获取oneOf内的id
    if (item.oneOf && item.oneOf.length > 0) {
      for (const oneOfItem of item.oneOf) {
        for (const key in oneOfItem.properties) {
          const objIdArr: string[] = getKeysFromObject(oneOfItem.properties[key]);

          objIdArr.forEach((objIdArrItem: string, index: number, array: Array<string>): void => {
            if (!idArr.includes(objIdArrItem)) idArr.push(objIdArrItem);
          });
        }
      }
    }
  } else {
    const id: string = item.id;

    idArr.push(id);

    // 获取oneOf内的id
    if (item.oneOf && item.oneOf.length > 0) {
      for (const oneOfItem of item.oneOf) {
        const oneOfItemId: string | undefined = oneOfItem.id;

        if (oneOfItemId && !idArr.includes(oneOfItemId)) idArr.push(oneOfItemId);
      }
    }
  }

  return idArr;
}

export default getKeysFromObject;