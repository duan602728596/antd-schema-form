import * as React from 'react';
import { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Input, Icon } from 'antd';
import styleName from '../../utils/styleName';
/* 兼容Input.Password组件，antd < 3.12.0 */
class InputPassword extends Component {
    // 切换事件
    handleVisibilityToggleClick(isPassword, event) {
        this.setState({
            type: isPassword ? 'text' : 'password'
        });
    }
    render() {
        const { props } = this;
        const { type } = this.state;
        const isPassword = type === 'password';
        return (React.createElement(Input, Object.assign({ type: type, suffix: React.createElement(Icon, { className: styleName('string-password-suffix'), type: isPassword ? 'eye' : 'eye-invisible', onClick: this.handleVisibilityToggleClick.bind(this, isPassword) }) }, props)));
    }
}
InputPassword.propTypes = {
    readOnly: PropTypes.bool,
    placeholder: PropTypes.string
};
export default InputPassword;
