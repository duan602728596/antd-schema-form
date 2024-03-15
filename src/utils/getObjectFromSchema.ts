import * as dayjs from 'dayjs';
import type { Store } from 'antd/es/form/interface';
import isAMomentObject from './isAMomentObject';
import type { SchemaItem, StringItem, NumberItem, BooleanItem, ArrayItem } from '../types';

type SchemaJson = SchemaItem | StringItem | NumberItem | BooleanItem | ArrayItem;

/**
 * 从schema里面提取出$defaultValue
 * @param { SchemaJson } schemaJsonItem - 对象
 * @param { string } [id] - 可能不存在id，使用上一个对象的id
 */
function getObjectFromSchema(schemaJsonItem: SchemaJson, id?: string): Store {
  let value: Store = {};

  if (schemaJsonItem.type === 'object') {
    for (const key in schemaJsonItem.properties) {
      value = { ...value, ...getObjectFromSchema(schemaJsonItem.properties[key]) };
    }
  } else if (schemaJsonItem.oneOf && schemaJsonItem.oneOf.length > 0) {
    const index: number = (('$oneOfIndex' in schemaJsonItem) && typeof schemaJsonItem.$oneOfIndex === 'number')
      ? schemaJsonItem.$oneOfIndex
      : 0;

    value = { ...value, ...getObjectFromSchema(schemaJsonItem.oneOf[index]) };
  } else if ('$defaultValue' in schemaJsonItem) {
    if (
      schemaJsonItem.$defaultValue
      && schemaJsonItem.type === 'string'
      && schemaJsonItem.$componentType === 'date'
      && !isAMomentObject(schemaJsonItem.$defaultValue)
    ) {
      // @ts-ignore
      value[schemaJsonItem.id ?? id] = dayjs(schemaJsonItem.$defaultValue);
    } else {
      // @ts-ignore
      value[schemaJsonItem.id ?? id] = schemaJsonItem.$defaultValue;
    }
  }

  return value;
}

export default getObjectFromSchema;