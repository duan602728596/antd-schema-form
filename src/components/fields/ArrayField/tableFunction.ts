import transform from 'lodash-es/transform';
import orderBy from 'lodash-es/orderBy';

/**
 * 格式化数据，使值满足antd的props-type
 * @param { Array<string | number> } rawArray: 原数据
 */
export function formatTableValue(rawArray: Array<string | number>): Array<{ value: string | number }> {
  return transform(rawArray, function(result: { value: string | number }[], item: string | number): void {
    result.push({ value: item });
  }, []);
}

/**
 * 对数组内的index排序，从大到小
 */
export function sortIndex(rawArray: Array<number>): Array<number> {
  if (rawArray.length <= 1) return rawArray;

  return orderBy(rawArray, [], ['desc']);
}