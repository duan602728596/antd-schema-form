import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Button, Input, message } from 'antd';
import { setSchemaJson } from '../store/reducer';
import style from './style.sass';
import { handleCopyTextClick } from '../../../utils';

/* state */
const state: Function = createStructuredSelector({
  schemaJson: createSelector(
    ($$state: Immutable.Map): ?Immutable.Map => $$state.has('createForm') ? $$state.get('createForm') : null,
    ($$data: ?Immutable.Map): Object => $$data !== null ? $$data.get('schemaJson').toJS() : {}
  )
});

/* dispatch */
const dispatch: Function = (dispatch: Function): Object=>({
  action: bindActionCreators({
    setSchemaJson
  }, dispatch)
});

@connect(state, dispatch)
class JsonInputTextArea extends Component{
  static propTypes: Object = {
    schemaJson: PropTypes.object,
    action: PropTypes.objectOf(PropTypes.func)
  };

  state: {
    schemaJson: Object,
    textAreaValue: string
  };

  constructor(): void{
    super(...arguments);

    const { schemaJson }: { schemaJson: Object } = this.props;

    this.state = {
      schemaJson,
      textAreaValue: JSON.stringify(schemaJson, null, 2)
    };
  }
  static getDerivedStateFromProps(nextProps: Object, prevState: Object): ?Object{
    if(nextProps.schemaJson !== prevState.schemaJson){
      const { schemaJson }: { schemaJson: Object } = nextProps;

      return {
        schemaJson,
        textAreaValue: JSON.stringify(schemaJson, null, 2)
      };
    }

    return null;
  }
  // 表单的change事件
  handleInputTextAreaChange: Function = (event: Event): void=>{
    this.setState({ textAreaValue: event.target.value });
  };
  // 刷新表单并同步到store
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
  render(): React.Element{
    const { textAreaValue }: { textAreaValue: string } = this.state;

    return (
      <Fragment>
        <div className={ style.tools }>
          <Button className={ style.mr10 }
            icon="copy"
            onClick={ handleCopyTextClick.bind(this, 'jsonSchemaTextArea') }
          >
            复制
          </Button>
          <Button icon="redo" onClick={ this.handleRedoJsonSchema }>刷新表单配置</Button>
        </div>
        <Input.TextArea id="jsonSchemaTextArea"
          rows={ 20 }
          value={ textAreaValue }
          onChange={ this.handleInputTextAreaChange }
        />
      </Fragment>
    );
  }
}

export default JsonInputTextArea;