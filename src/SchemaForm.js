import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import Context from './context';
import FormObject from './components/FormObject/FormObject';
import getObjectFromValue from './utils/getObjectFromValue';

@Form.create()
class SchemaForm extends PureComponent{
  static propTypes: Object = {
    form: PropTypes.object,
    json: PropTypes.object,
    value: PropTypes.object,
    onOk: PropTypes.func,
    onCancel: PropTypes.func
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
  static getDerivedPropsFromState(nextProps: Object, prevState: Object): ?Object{
    if(nextProps.value !== prevState.value){
      const { form, value }: {
        form: Object,
        value: Object
      } = nextProps;
      const obj: Object = getObjectFromValue(value);

      form.resetFields();
      form.setFieldsValue(obj);
    }

    return null;
  }
  // 拼凑成值
  setFormValueObject(keys: string[], value: Object): Object{
    const obj: Object = {};

    for(const item: string of keys){
      obj[item] = value[item];
    }

    return obj;
  }
  render(): React.Element{
    const { form, json, onUpload, onOk, onCancel }: {
      form: Object,
      json: Object,
      onUpload: ?Function,
      onOk: ?Function,
      onCancel: ?Function
    } = this.props;

    return (
      <Context.Provider value={{ form, onUpload }}>
        <FormObject root={ json } onOk={ onOk } onCancel={ onCancel } />
      </Context.Provider>
    );
  }
}

export default SchemaForm;