import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import Context from './context';
import FormObject from './components/FormObject/FormObject';
import getObjectFromValue from './utils/getObjectFromValue';

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
    footer: PropTypes.func
  };

  constructor(): void{
    super(...arguments);

    const { value }: { value: ?Object } = this.props;

    this.state = { value };
  }
  componentDidMount(): void{
    const { value }: { value: ?Object } = this.state;
    const { form }: { form: Object } = this.props;
    const obj: Object = getObjectFromValue(value);

    form.setFieldsValue(obj);
  }
  render(): React.Element{
    const { form, json, onUpload, onOk, onCancel, okText, cancelText, footer }: {
      form: Object,
      json: Object,
      onUpload: ?Function,
      onOk: ?Function,
      onCancel: ?Function,
      okText: ?(string | number),
      cancelText: ?(string | number),
      footer: ?Function
    } = this.props;

    return (
      <Context.Provider value={{ form, onUpload }}>
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