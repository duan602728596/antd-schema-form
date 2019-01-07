import React, { Component } from 'react';
import { Input, Icon } from 'antd';
import styleName from '../../utils/styleName';

/* 兼容Input.Password组件，antd < 3.12.0 */
class InputPassword extends Component{
  state: Object = {
    type: 'password'
  };

  // 切换事件
  handleVisibilityToggleClick(isPassword: boolean, event: Event): void{
    this.setState({
      type: isPassword ? 'text' : 'password'
    });
  }
  render(): React.Element{
    const { props }: { props: Object } = this;
    const { type }: { type: string } = this.state;
    const isPassword: boolean = type === 'password';

    return (
      <Input type={ type }
        suffix={
          <Icon className={ styleName('string-password-suffix') }
            type={ isPassword ? 'eye' : 'eye-invisible' }
            onClick={ this.handleVisibilityToggleClick.bind(this, isPassword) }
          />
        }
        { ...props }
      />
    );
  }
}

export default InputPassword;