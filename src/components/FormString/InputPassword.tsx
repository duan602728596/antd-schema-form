import * as React from 'react';
import { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Requireable } from 'prop-types';
import { Input, Icon } from 'antd';
import styleName from '../../utils/styleName';

interface InputPasswordProps {
  readOnly: boolean | undefined;
  placeholder: string | undefined;
}

interface InputPasswordState {
  type: string;
}

/* 兼容Input.Password组件，antd < 3.12.0 */
class InputPassword extends Component<InputPasswordProps, InputPasswordState> {
  static propTypes: {
    readOnly: Requireable<boolean>;
    placeholder: Requireable<string>;
  } = {
    readOnly: PropTypes.bool,
    placeholder: PropTypes.string
  };

  // 切换事件
  handleVisibilityToggleClick(isPassword: boolean, event: Event): void {
    this.setState({
      type: isPassword ? 'text' : 'password'
    });
  }

  render(): React.ReactNode {
    const { props }: { props: InputPasswordProps } = this;
    const { type }: InputPasswordState = this.state;
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