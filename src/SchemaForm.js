import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import Context from './context';
import FormObject from './components/FormObject/FormObject';
import getObjectFromValue from './utils/getObjectFromValue';
import { isObject } from './utils/type';
import languagePack from './language/languagePack';

@Form.create()
class SchemaForm extends Component{
  static propTypes: Object = {
    form: PropTypes.object,
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
  static defaultProps: Object = {
    customComponent: {}
  };

  constructor(): void{
    super(...arguments);

    const { value }: { value: ?Object } = this.props;
    // 获取系统语言
    const language: string = typeof window === 'object' ? do{
      (window.navigator.language || window.navigator.userLanguage).toLocaleLowerCase();
    } : 'default';

    this.state = { value, language };
  }
  componentDidMount(): void{
    const { value }: { value: ?Object } = this.state;
    const { form }: { form: Object } = this.props;
    const obj: Object = getObjectFromValue(value);

    form.setFieldsValue(obj);
  }
  static getDerivedStateFromProps(nextProps: Object, prevState: Object): ?Object{
    if(nextProps.value !== prevState.value){
      const { form, value }: {
        form: Object,
        value: Object
      } = nextProps;
      const obj: Object = getObjectFromValue(value);

      form.resetFields();
      form.setFieldsValue(obj);

      return { value: nextProps.value };
    }
    return null;
  }
  render(): React.Element{
    const { form, json, onUpload, onOk, onCancel, okText, cancelText, footer, customComponent }: {
      form: Object,
      json: Object,
      onUpload: ?Function,
      onOk: ?Function,
      onCancel: ?Function,
      okText: ?(string | number),
      cancelText: ?(string | number),
      footer: ?Function,
      customComponent: Object
    } = this.props;
    const languagePack2: Object = this.props.languagePack; // 自定义语言包
    const { language }: { language: Object } = this.state;
    const contextValue: Object = {
      form,
      onUpload,
      customComponent,
      language,
      languagePack: isObject(languagePack2) ? languagePack2 : (language in languagePack ? languagePack[language] : languagePack.default) // 语言包
    };

    return (
      <Context.Provider value={ contextValue }>
        <FormObject root={ json }
          onOk={ onOk }
          onCancel={ onCancel }
          okText={ okText }
          cancelText={ cancelText }
          footer={ footer }
        />
      </Context.Provider>
    );
  }
}

export default SchemaForm;