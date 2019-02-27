import { isObject } from './type';
/**
 * object对象，格式化成表单需要的值
 * @param { object } obj: 对象
 * @param { string } basicId: 前置id
 */
function getObjectFromValue(obj, basicId) {
    let value = {};
    for (const key in obj) {
        const item = obj[key];
        if (isObject(item) && !item._isAMomentObject) {
            const result = getObjectFromValue(item, basicId ? `${basicId}/${key}/properties` : `${key}/properties`);
            value = Object.assign({}, value, result);
        }
        else {
            value[basicId ? `${basicId}/${key}` : key] = item;
        }
    }
    return value;
}
export default getObjectFromValue;
