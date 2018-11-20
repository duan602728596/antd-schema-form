import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Context from './context';
import FormObject from './components/FormObject/FormObject';

class SchemaForm extends Component{
  static propTypes: Object = {
    form: PropTypes.object,
    json: PropTypes.object,
    defaultValue: PropTypes.any,
    value: PropTypes.any
  };

  constructor(): void{
    super(...arguments);
  }
  render(): React.Element{
    const { form, json, onUpload }: {
      form: Object,
      json: Object,
      onUpload: ?Function
    } = this.props;

    return (
      <Context.Provider value={{ form, onUpload }}>
        <FormObject root={ json } />
      </Context.Provider>
    );
  }
}

export default SchemaForm;