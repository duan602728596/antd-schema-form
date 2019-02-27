"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var defaultLang = require("../language/default.json");
var zhCNLang = require("../language/zh-CN.json");
var requireJson_1 = require("./utils/requireJson");
// 语言包，key值小写
var languagePack = {
    'default': requireJson_1.default(defaultLang),
    'zh-cn': requireJson_1.default(zhCNLang)
};
exports.default = languagePack;
