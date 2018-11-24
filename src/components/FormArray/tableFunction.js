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

/**
 * 获取对象下所有的key
 * @param { Object } item: 对象
 */
export function getKeysFromObject(item: Object): Array<string>{
  const idArr: string[] = [];

  if(item.type === 'object'){
    for(const key: string in item.properties){
      const objIdArr: string[] = getKeysFromObject(item.properties[key]);

      idArr.push(...objIdArr);
    }
  }else{
    const $id: string = item?.$id || item?.id;

    idArr.push($id);
  }

  return idArr;
}