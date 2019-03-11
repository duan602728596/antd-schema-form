import React from 'react';
import { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { Row, Col, Input, Button, message, Modal } from 'antd';
import { setSchemaJson } from '../store/reducer';
import style from './style.sass';
import { handleCopyTextClick } from '../../../utils';
import SchemaForm from 'antd-schema-form';
import schemaFormDefaultLang from 'antd-schema-form/language/default.json';
import schemaFormZhCNLang from 'antd-schema-form/language/zh-CN.json';
import { I18NContext } from '../../../components/I18N/I18N';

/* state */
const state = createStructuredSelector({
  schemaJson: createSelector(
    ($$state) => $$state.has('preview') ? $$state.get('preview') : null,
    ($$data) => $$data ? ($$data.get('schemaJson') ? $$data.get('schemaJson').toJS() : null) : null
  )
});

/* dispatch */
const dispatch = (dispatch) => ({
  action: bindActionCreators({
    setSchemaJson
  }, dispatch)
});

class Index extends Component {
  static contextType = I18NContext;
  static propTypes = {
    schemaJson: PropTypes.object,
    action: PropTypes.objectOf(PropTypes.func)
  };

  constructor() {
    super(...arguments);

    const { schemaJson } = this.props;

    this.state = {
      textAreaValue: schemaJson === null ? '' : JSON.stringify(schemaJson, null, 2)
    };
  }

  // 表单确认事件
  handleOnFormOkClick = (form, value, keys) => {
    const { languagePack } = this.context;
    const langMessage = languagePack.message;

    Modal.info({
      content: (
        <div>
          <h4>{ langMessage.modalTitle }</h4>
          <pre>{ JSON.stringify(value, null, 2) }</pre>
        </div>
      )
    });
  };

  // 表单预览
  handleRedoJsonSchema = (event) => {
    const { textAreaValue } = this.state;
    const { action } = this.props;
    const langMessage = this.context.languagePack.message;
    let value = null;

    try {
      value = JSON.parse(textAreaValue);
      action.setSchemaJson(value);
    } catch (err) {
      message.error(langMessage.jsonFormatError);
    }
  };

  // 表单的change事件
  handleInputTextAreaChange = (event) => {
    this.setState({ textAreaValue: event.target.value });
  };

  render() {
    const { textAreaValue } = this.state;
    const { schemaJson } = this.props;
    const { language, languagePack } = this.context;
    const { preview } = languagePack;
    const langMessage = languagePack.message;

    return (
      <Fragment>
        <p>{ preview.introduction }</p>
        <Row className={ style.mb10 } type="flex" gutter={ 10 }>
          <Col xs={ 24 } sm={ 24 } md={ 8 }>
            <div className={ style.tools }>
              <Button className={ style.mr10 }
                icon="copy"
                onClick={ handleCopyTextClick.bind(this, 'jsonSchemaTextArea2', langMessage.copyMessage) }
              >
                { preview.copy }
              </Button>
              <Button type="primary" icon="tablet" onClick={ this.handleRedoJsonSchema }>{ preview.generateForm }</Button>
            </div>
            <Input.TextArea id="jsonSchemaTextArea2"
              rows={ 20 }
              value={ textAreaValue }
              onChange={ this.handleInputTextAreaChange }
            />
          </Col>
          <Col xs={ 24 } sm={ 24 } md={ 16 }>
            {
              schemaJson ? (
                <SchemaForm json={ schemaJson }
                  languagePack={ language === 'zh-cn' ? schemaFormZhCNLang : schemaFormDefaultLang }
                  onOk={ this.handleOnFormOkClick }
                />
              ) : null
            }
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default connect(state, dispatch)(Index);