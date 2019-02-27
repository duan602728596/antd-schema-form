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
var styleName_1 = require("../../utils/styleName");
/* 兼容Input.Password组件，antd < 3.12.0 */
var InputPassword = /** @class */ (function (_super) {
    __extends(InputPassword, _super);
    function InputPassword() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // 切换事件
    InputPassword.prototype.handleVisibilityToggleClick = function (isPassword, event) {
        this.setState({
            type: isPassword ? 'text' : 'password'
        });
    };
    InputPassword.prototype.render = function () {
        var props = this.props;
        var type = this.state.type;
        var isPassword = type === 'password';
        return (React.createElement(antd_1.Input, __assign({ type: type, suffix: React.createElement(antd_1.Icon, { className: styleName_1.default('string-password-suffix'), type: isPassword ? 'eye' : 'eye-invisible', onClick: this.handleVisibilityToggleClick.bind(this, isPassword) }) }, props)));
    };
    InputPassword.propTypes = {
        readOnly: PropTypes.bool,
        placeholder: PropTypes.string
    };
    return InputPassword;
}(react_1.Component));
exports.default = InputPassword;
