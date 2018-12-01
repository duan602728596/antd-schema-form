/**
 * 格式化数据，使值满足antd的props-type
 * @param { Array } rawArray: 原数据
 */
export function formatTableValue(rawArray: Array): Array{
  const result: [] = [];

  for(const item: any of rawArray){
    result.push({ value: item });
  }

  return result;
}