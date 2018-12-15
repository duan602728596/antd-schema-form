import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Row, Col, Input, Button, message, Modal } from 'antd';
import { setSchemaJson } from '../store/reducer';
import style from './style.sass';
import { handleCopyTextClick } from '../../../utils';
import SchemaForm from '../../../components/SchemaForm/SchemaForm';

/* state */
const state: Function = createStructuredSelector({
  schemaJson: createSelector(
    ($$state: Immutable.Map): ?Immutable.Map => $$state.has('preview') ? $$state.get('preview') : null,
    ($$data: ?Immutable.Map): Object => $$data !== null ? ($$data.get('schemaJson') ? $$data.get('schemaJson').toJS() : null) : null
  )
});

/* dispatch */
const dispatch: Function = (dispatch: Function): Object=>({
  action: bindActionCreators({
    setSchemaJson
  }, dispatch)
});

@connect(state, dispatch)
class Index extends Component{
  static propTypes: Object = {
    schemaJson: PropTypes.object,
    action: PropTypes.objectOf(PropTypes.func)
  };

  state: {
    textAreaValue: string
  };

  constructor(): void{
    super(...arguments);

    const { schemaJson }: { setSchemaJson: ?Object } = this.props;

    this.state = {
      textAreaValue: schemaJson === null ? '' : JSON.stringify(schemaJson, null, 2)
    };
  }
  // 表单确认事件
  handleOnFormOkClick(form: Object, value: Object, keys: string[]): void{
    Modal.info({
      content: (
        <div>
          <h4>表单的值为：</h4>
          <pre>{ JSON.stringify(value, null, 2) }</pre>
        </div>
      )
    });
  }
  // 表单预览
  handleRedoJsonSchema: Function = (event: Event): void=>{
    const { textAreaValue }: { textAreaValue: string } = this.state;
    const { action }: { action: Object } = this.props;
    let value: ?Object = null;

    try{
      value = JSON.parse(textAreaValue);
      action.setSchemaJson(value);
    }catch(err){
      message.error('JSON格式错误！');
    }
  };
  // 表单的change事件
  handleInputTextAreaChange: Function = (event: Event): void=>{
    this.setState({ textAreaValue: event.target.value });
  };
  render(): React.Element{
    const { textAreaValue }: { textAreaValue: string } = this.state;
    const { schemaJson }: { schemaJson: ?Object } = this.props;

    return (
      <Row className={ style.mb10 } type="flex" gutter={ 10 }>
        <Col xs={ 24 } sm={ 24 } md={ 8 }>
          <div className={ style.tools }>
            <Button className={ style.mr10 }
              icon="copy"
              onClick={ handleCopyTextClick.bind(this, 'jsonSchemaTextArea2') }
            >
              复制
            </Button>
            <Button type="primary" icon="tablet" onClick={ this.handleRedoJsonSchema }>生成表单</Button>
          </div>
          <Input.TextArea id="jsonSchemaTextArea2"
            rows={ 20 }
            value={ textAreaValue }
            onChange={ this.handleInputTextAreaChange }
          />
        </Col>
        <Col xs={ 24 } sm={ 24 } md={ 16 }>
          {schemaJson ? <SchemaForm json={ schemaJson } onOk={ this.handleOnFormOkClick } /> : null}
        </Col>
      </Row>
    );
  }
}

export default Index;