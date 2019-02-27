import { isObject } from './type';
/**
 * 格式化数据
 * @param { object } value: 表单值
 * @param { string } basicId: 格式化数据的id
 */
export function formatValueBeforeGetValue(value, basicId) {
    const reg = new RegExp(`^${basicId.replace('$', '\\$')}/`);
    const formatValue = {};
    for (const key in value) {
        const formatKey = key.replace(reg, '');
        formatValue[formatKey] = value[key];
    }
    return formatValue;
}
/**
 * 从form获取到的表单的值，格式化成object对象
 * @param { object } value: 表单值
 */
function getValueFromObject(value) {
    const obj = {};
    for (const key in value) {
        const keyArr = key.split('/');
        const len = keyArr.length;
        let index = 0;
        let point = obj;
        while (index < len) {
            // 判断是否为对象
            const nowKey = keyArr[index];
            const nextKey = keyArr[index + 1];
            if (nextKey && nextKey === 'properties') {
                if (!isObject(point[nowKey]))
                    point[nowKey] = {};
                point = point[nowKey];
                index += 2;
            }
            else if (!nextKey) {
                point[nowKey] = value[key];
                break;
            }
            else if (nextKey && nextKey === 'items') {
                break;
            }
            else {
                index += 1;
            }
        }
    }
    return obj;
}
export default getValueFromObject;
