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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var PropTypes = require("prop-types");
var antd_1 = require("antd");
var context_1 = require("../../context");
var TableComponent_1 = require("./TableComponent");
var styleName_1 = require("../../utils/styleName");
var createArrayRules_1 = require("./createArrayRules");
var FormArray = /** @class */ (function (_super) {
    __extends(FormArray, _super);
    function FormArray() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // select的下拉框
    FormArray.prototype.selectOptionsView = function (options) {
        return options.map(function (item, index) {
            return React.createElement(antd_1.Select.Option, { key: "" + index, value: item.value }, item.label);
        });
    };
    FormArray.prototype.render = function () {
        var _a = this.context, form = _a.form, customComponent = _a.customComponent;
        var getFieldDecorator = form.getFieldDecorator, 
        // @ts-ignore: rc-form
        getFieldProps = form.getFieldProps;
        var _b = this.props, root = _b.root, required = _b.required;
        var id = root.id, title = root.title, description = root.description, $componentType = root.$componentType, $defaultValue = root.$defaultValue, _c = root.$options, $options = _c === void 0 ? [] : _c;
        var rules = createArrayRules_1.default(root, required);
        var option = { rules: rules };
        var isTableComponent = false; // 判断是否为table组件
        var element = null;
        // 表单默认值
        if ($defaultValue)
            option.initialValue = $defaultValue;
        switch ($componentType) {
            case 'checkbox':
                element = getFieldDecorator(id, option)(React.createElement(antd_1.Checkbox.Group, { options: $options }));
                break;
            case 'multiple':
            case 'tags':
                element = getFieldDecorator(id, option)(React.createElement(antd_1.Select, { className: styleName_1.default('array-multiple'), mode: $componentType }, this.selectOptionsView($options)));
                break;
            default:
                if (customComponent && $componentType && $componentType in customComponent) {
                    element = customComponent[$componentType](root, option, form, required);
                }
                else {
                    element = React.createElement(TableComponent_1.default, __assign({ root: root }, getFieldProps(id, option)));
                    isTableComponent = true;
                }
        }
        return (React.createElement(antd_1.Form.Item, { className: isTableComponent ? styleName_1.default('array-table-form-item') : undefined, label: title },
            React.createElement(antd_1.Tooltip, { title: description, placement: "topRight" }, element)));
    };
    FormArray.contextType = context_1.default;
    FormArray.propTypes = {
        root: PropTypes.object,
        required: PropTypes.bool
    };
    return FormArray;
}(react_1.Component));
exports.default = FormArray;
