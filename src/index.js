import React, { Component, createElement } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import SchemaForm from './SchemaForm';

class Index extends Component{
  static propTypes: Object = {
    form: PropTypes.object
  };

  render(): React.Element{
    const props: ?Object = this?.props || {};
    const form: ?Object = props?.form;

    // 根据传入form来判断是否需要Form.create包装组件
    if(form){
      return <SchemaForm { ...props } />;
    }else{
      return createElement(Form.create()(SchemaForm), { ...props });
    }
  }
}

export default Index;