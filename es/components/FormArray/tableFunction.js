/**
 * 格式化数据，使值满足antd的props-type
 * @param { Array } rawArray: 原数据
 */
export function formatTableValue(rawArray) {
    const result = [];
    for (const item of rawArray) {
        result.push({ value: item });
    }
    return result;
}
/**
 * 对数组内的index排序，从大到小
 */
export function sortIndex(rawArray) {
    if (rawArray.length <= 1)
        return rawArray;
    for (let i = 0, j = rawArray.length; i < j; i++) {
        let max = i;
        for (let k = i + 1; k < j; k++) {
            if (rawArray[k] > rawArray[max])
                max = k;
        }
        if (max !== i) {
            const middle = rawArray[max];
            rawArray.splice(max, 1);
            rawArray.splice(i, 0, middle);
        }
    }
    return rawArray;
}
