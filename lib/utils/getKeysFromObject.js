"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 获取schema.json下所有的key
 * @param { SchemaItem } item: 对象
 */
function getKeysFromObject(item) {
    var idArr = [];
    if (item.type === 'object') {
        for (var key in item.properties) {
            var objIdArr = getKeysFromObject(item.properties[key]);
            idArr.push.apply(idArr, objIdArr);
        }
    }
    else {
        var id = item.id;
        idArr.push(id);
    }
    return idArr;
}
exports.default = getKeysFromObject;
