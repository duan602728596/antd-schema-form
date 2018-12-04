/**
 * 获取schema.json下所有的key
 * @param { Object } item: 对象
 */
function getKeysFromObject(item: Object): Array<string>{
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

export default getKeysFromObject;