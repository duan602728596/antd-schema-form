// @flow
import * as React from 'react';
import { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import type { RecordInstance } from 'immutable/dist/immutable.js.flow';
import { createSelector, createStructuredSelector } from 'reselect';
import { Row, Col, Input, Button, message, Modal } from 'antd';
import { setSchemaJson } from '../store/reducer';
import style from './style.sass';
import { handleCopyTextClick } from '../../../utils';
import SchemaForm, { schemaFormDefaultLang, schemaFormZhCNLang } from '../../../components/SchemaForm/SchemaForm';
import { I18NContext } from '../../../components/I18N/I18N';

/* state */
const state: Function = createStructuredSelector({
  schemaJson: createSelector(
    ($$state: RecordInstance<Object>): ?RecordInstance<Object> => $$state.has('preview') ? $$state.get('preview') : null,
    ($$data: ?RecordInstance<Object>): Object => $$data ? ($$data.get('schemaJson') ? $$data.get('schemaJson').toJS() : null) : null
  )
});

/* dispatch */
const dispatch: Function = (dispatch: Function): Object=>({
  action: bindActionCreators({
    setSchemaJson
  }, dispatch)
});

type IndexProps = {
  schemaJson: ?Object,
  action: Object
};

type IndexState = {
  textAreaValue: string
};

class Index extends Component<IndexProps, IndexState>{
  static contextType: React.Context<Object> = I18NContext;
  static propTypes: Object = {
    schemaJson: PropTypes.object,
    action: PropTypes.objectOf(PropTypes.func)
  };

  constructor(): void{
    super(...arguments);

    const { schemaJson }: { schemaJson: ?Object } = this.props;

    this.state = {
      textAreaValue: schemaJson === null ? '' : JSON.stringify(schemaJson, null, 2)
    };
  }
  // 表单确认事件
  handleOnFormOkClick: Function = (form: Object, value: Object, keys: string[]): void=>{
    const { languagePack }: { languagePack: Object } = this.context;
    const message2: Object = languagePack.message;

    Modal.info({
      content: (
        <div>
          <h4>{ message2.modalTitle }</h4>
          <pre>{ JSON.stringify(value, null, 2) }</pre>
        </div>
      )
    });
  };
  // 表单预览
  handleRedoJsonSchema: Function = (event: Event): void=>{
    const { textAreaValue }: { textAreaValue: string } = this.state;
    const { action }: { action: Object } = this.props;
    const message2: Object = this.context.languagePack.message;
    let value: ?Object = null;

    try{
      value = JSON.parse(textAreaValue);
      action.setSchemaJson(value);
    }catch(err){
      message.error(message2.jsonFormatError);
    }
  };
  // 表单的change事件
  handleInputTextAreaChange: Function = (event: Event): void=>{
    this.setState({ textAreaValue: event.target.value });
  };
  render(): React.Node{
    const { textAreaValue }: { textAreaValue: string } = this.state;
    const { schemaJson }: { schemaJson: ?Object } = this.props;
    const { language, languagePack }: {
      language: string,
      languagePack: Object
    } = this.context;
    const { preview }: { preview: Object } = languagePack;
    const message2: Object = languagePack.message;

    return (
      <Fragment>
        <p>{ preview.introduction }</p>
        <Row className={ style.mb10 } type="flex" gutter={ 10 }>
          <Col xs={ 24 } sm={ 24 } md={ 8 }>
            <div className={ style.tools }>
              <Button className={ style.mr10 } icon="copy" onClick={ handleCopyTextClick.bind(this, 'jsonSchemaTextArea2', message2.copyMessage) }>
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