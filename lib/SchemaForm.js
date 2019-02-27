"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var PropTypes = require("prop-types");
var antd_1 = require("antd");
var context_1 = require("./context");
var FormObject_1 = require("./components/FormObject/FormObject");
var getObjectFromValue_1 = require("./utils/getObjectFromValue");
var type_1 = require("./utils/type");
var languagePack_1 = require("./languagePack");
// @ts-ignore
var SchemaForm = /** @class */ (function (_super) {
    __extends(SchemaForm, _super);
    function SchemaForm(props) {
        var argu = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            argu[_i - 1] = arguments[_i];
        }
        var _this = _super.apply(this, [props].concat(argu)) || this;
        var value = _this.props.value;
        // 获取系统语言
        var language = typeof window === 'object' // 服务器端渲染判断
            ? (window.navigator.language || window.navigator['userLanguage']).toLocaleLowerCase()
            : 'default';
        var customLangPack = _this.props.languagePack; // 自定义语言包
        var langP = type_1.isObject(customLangPack)
            ? customLangPack
            : (language in languagePack_1.default ? languagePack_1.default[language] : languagePack_1.default['default']); // 语言包
        _this.state = {
            value: value,
            language: language,
            languagePack: langP
        };
        return _this;
    }
    SchemaForm.prototype.componentDidMount = function () {
        var value = this.state.value;
        var form = this.props.form;
        var obj = getObjectFromValue_1.default(value);
        form.setFieldsValue(obj);
    };
    SchemaForm.getDerivedStateFromProps = function (nextProps, prevState) {
        if (nextProps.value !== prevState.value) {
            var form = nextProps.form, value = nextProps.value;
            var obj = getObjectFromValue_1.default(value);
            form.resetFields();
            form.setFieldsValue(obj);
            return { value: nextProps.value };
        }
        return null;
    };
    SchemaForm.prototype.render = function () {
        var _a = this.props, form = _a.form, json = _a.json, onOk = _a.onOk, onCancel = _a.onCancel, okText = _a.okText, cancelText = _a.cancelText, footer = _a.footer, customComponent = _a.customComponent;
        var _b = this.state, language = _b.language, languagePack = _b.languagePack;
        var contextValue = {
            form: form,
            customComponent: customComponent,
            language: language,
            languagePack: languagePack // 语言包
        };
        return (React.createElement(context_1.default.Provider, { value: contextValue },
            React.createElement(FormObject_1.default, { root: json, onOk: onOk, onCancel: onCancel, okText: okText, cancelText: cancelText, footer: footer })));
    };
    SchemaForm.propTypes = {
        json: PropTypes.object,
        value: PropTypes.object,
        onOk: PropTypes.func,
        onCancel: PropTypes.func,
        okText: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        cancelText: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        footer: PropTypes.func,
        customComponent: PropTypes.objectOf(PropTypes.func),
        languagePack: PropTypes.object
    };
    SchemaForm.defaultProps = {
        customComponent: {}
    };
    SchemaForm = __decorate([
        antd_1.Form.create()
    ], SchemaForm);
    return SchemaForm;
}(react_1.Component));
exports.default = SchemaForm;
