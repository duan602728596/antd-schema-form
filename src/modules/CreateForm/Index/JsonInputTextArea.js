// @flow
import * as React from 'react';
import { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import type { RecordInstance } from 'immutable/dist/immutable.js.flow';
import classNames from 'classnames';
import { Button, Input, message } from 'antd';
import { setSchemaJson } from '../store/reducer';
import style from './style.sass';
import { handleCopyTextClick } from '../../../utils';
import { I18NContext } from '../../../components/I18N/I18N';

/* state */
const state: Function = createStructuredSelector({
  schemaJson: createSelector(
    ($$state: RecordInstance<Object>): ?RecordInstance<Object> => $$state.has('createForm') ? $$state.get('createForm') : null,
    ($$data: ?RecordInstance<Object>): Object => $$data ? $$data.get('schemaJson').toJS() : {}
  )
});

/* dispatch */
const dispatch: Function = (dispatch: Function): Object=>({
  action: bindActionCreators({
    setSchemaJson
  }, dispatch)
});

type JsonInputTextAreaProps = {
  schemaJson: Object,
  action: Object
};

type JsonInputTextAreaState = {
  schemaJson: Object,
  textAreaValue: string
};

class JsonInputTextArea extends Component<JsonInputTextAreaProps, JsonInputTextAreaState>{
  static contextType: React.Context<Object> = I18NContext;
  static propTypes: Object = {
    schemaJson: PropTypes.object,
    action: PropTypes.objectOf(PropTypes.func)
  };

  state: JsonInputTextAreaState;

  constructor(): void{
    super(...arguments);

    const { schemaJson }: { schemaJson: Object } = this.props;

    this.state = {
      schemaJson,
      textAreaValue: JSON.stringify(schemaJson, null, 2)
    };
  }
  static getDerivedStateFromProps(nextProps: JsonInputTextAreaProps, prevState: JsonInputTextAreaState): ?{ schemaJson: Object, textAreaValue: string }{
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
    const message2: Object = this.context.languagePack.message;
    let value: ?Object = null;

    try{
      value = JSON.parse(textAreaValue);
      action.setSchemaJson(value);
    }catch(err){
      message.error(message2.jsonFormatError);
    }
  };
  render(): React.Node{
    const { textAreaValue }: { textAreaValue: string } = this.state;
    const { languagePack }: { languagePack: Object } = this.context;
    const { createForm }: { createForm: Object } = languagePack;
    const message2: Object = languagePack.message;

    return (
      <Fragment>
        <div>
          <Button className={ classNames(style.mr10, style.mb10) }
            icon="copy"
            onClick={ handleCopyTextClick.bind(this, 'jsonSchemaTextArea', message2.copyMessage) }
          >
            { createForm.copy }
          </Button>
          <Button className={ style.mb10 } icon="redo" onClick={ this.handleRedoJsonSchema }>
            { createForm.refreshFormConfiguration }
          </Button>
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

export default connect(state, dispatch)(JsonInputTextArea);