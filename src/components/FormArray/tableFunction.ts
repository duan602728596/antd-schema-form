/**
 * 格式化数据，使值满足antd的props-type
 * @param { Array } rawArray: 原数据
 */
export function formatTableValue(rawArray: Array<string | number>): Array<{ value: string | number }>{
  const result: { value: string | number }[] = [];

  for(const item of rawArray){
    result.push({ value: item });
  }

  return result;
}

/**
 * 对数组内的index排序，从大到小
 */
export function sortIndex(rawArray: Array<number>): Array<number>{
  if(rawArray.length <= 1) return rawArray;

  for(let i: number = 0, j: number = rawArray.length; i < j; i++){
    let max: number = i;

    for(let k: number = i + 1; k < j; k++){
      if(rawArray[k] > rawArray[max]) max = k;
    }

    if(max !== i){
      const middle: number = rawArray[max];

      rawArray.splice(max, 1);
      rawArray.splice(i, 0, middle);
    }
  }

  return rawArray;
}