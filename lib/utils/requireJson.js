"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var type_1 = require("./type");
/**
 * 加载json文件
 *
 * typescript下，json包含default
 * babel下，json不包含default
 */
function requireJson(modules) {
    if (type_1.isModule(modules) && 'default' in modules) {
        return modules.default;
    }
    else {
        return modules;
    }
}
exports.default = requireJson;
