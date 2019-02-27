/**
 * 获取schema.json下所有的key
 * @param { SchemaItem } item: 对象
 */
function getKeysFromObject(item) {
    const idArr = [];
    if (item.type === 'object') {
        for (const key in item.properties) {
            const objIdArr = getKeysFromObject(item.properties[key]);
            idArr.push(...objIdArr);
        }
    }
    else {
        const id = item.id;
        idArr.push(id);
    }
    return idArr;
}
export default getKeysFromObject;
