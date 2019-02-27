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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var PropTypes = require("prop-types");
var antd_1 = require("antd");
var context_1 = require("../../context");
var styleName_1 = require("../../utils/styleName");
var createNumberRules_1 = require("./createNumberRules");
var FormNumber = /** @class */ (function (_super) {
    __extends(FormNumber, _super);
    function FormNumber() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormNumber.prototype.render = function () {
        var _a = this.context, form = _a.form, customComponent = _a.customComponent;
        var getFieldDecorator = form.getFieldDecorator;
        // type=object时，会判断key是否存在于required数组中
        var _b = this.props, root = _b.root, required = _b.required;
        var id = root.id, type = root.type, title = root.title, description = root.description, $componentType = root.$componentType, $readOnly = root.$readOnly, $defaultValue = root.$defaultValue, _c = root.$options, $options = _c === void 0 ? [] : _c, $placeholder = root.$placeholder;
        var rules = createNumberRules_1.default(this.props.root, required, type === 'integer');
        var option = { rules: rules };
        var element = null;
        // 表单默认值
        if ($defaultValue)
            option.initialValue = $defaultValue;
        switch ($componentType) {
            // 渲染radio
            case 'radio':
                element = getFieldDecorator(id, option)(React.createElement(antd_1.Radio.Group, { options: $options }));
                break;
            default:
                element = (customComponent && $componentType && $componentType in customComponent)
                    ? customComponent[$componentType](root, option, form, required)
                    : getFieldDecorator(id, option)(React.createElement(antd_1.InputNumber, { className: styleName_1.default('number-input'), readOnly: $readOnly, placeholder: $placeholder }));
        }
        return (React.createElement(antd_1.Form.Item, { label: title },
            React.createElement(antd_1.Tooltip, { title: description, placement: "topRight" }, element)));
    };
    FormNumber.contextType = context_1.default;
    FormNumber.propTypes = {
        root: PropTypes.object,
        required: PropTypes.bool
    };
    return FormNumber;
}(react_1.Component));
exports.default = FormNumber;
