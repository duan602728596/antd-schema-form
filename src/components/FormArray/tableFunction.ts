/**
 * 格式化数据，使值满足antd的props-type
 * @param { Array<string | number> } [rawArray = []] - 原数据
 */
export function formatTableValue(rawArray: Array<string | number> = []): Array<{ value: string | number }> {
  return rawArray.reduce(function(result: Array<{ value: string | number }>, item: string | number): Array<{ value: string | number }> {
    result.push({ value: item });

    return result;
  }, []);
}

/**
 * 对数组内的index排序，从大到小
 */
export function sortIndex(rawArray: Array<number>): Array<number> {
  if (rawArray.length <= 1) {
    return rawArray;
  }

  return rawArray.sort((a: number, b: number): number => b - a);
}