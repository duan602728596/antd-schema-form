import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import SchemaForm from 'antd-schema-form';

class SchemaFormPreview extends Component {
  static propTypes = {
    json: PropTypes.object,
    languagePack: PropTypes.object,
    onOk: PropTypes.func
  };

  componentDidCatch(error, info) {
    message.error('Schema has error!');
  }

  render() {
    const { json, languagePack, onOk } = this.props;
    const props = { json, languagePack, onOk };

    return <SchemaForm { ...props } />;
  }
}

export default SchemaFormPreview;