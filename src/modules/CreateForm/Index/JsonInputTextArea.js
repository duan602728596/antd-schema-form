import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import classNames from 'classnames';
import { Button, Input, message } from 'antd';
import { setSchemaJson } from '../reducer/reducer';
import style from './style.sass';
import { handleCopyTextClick } from '../../../utils';
import { I18NContext } from '../../../components/I18N/I18N';

/* state */
const state = createStructuredSelector({
  schemaJson: createSelector(
    ($$state) => $$state.has('createForm') ? $$state.get('createForm') : null,
    ($$data) => $$data ? $$data.get('schemaJson').toJS() : {}
  )
});

/* actions */
const actions = (dispatch) => ({
  actions: bindActionCreators({
    setSchemaJson
  }, dispatch)
});

@connect(state, actions)
class JsonInputTextArea extends Component {
  static contextType = I18NContext;
  static propTypes = {
    schemaJson: PropTypes.object,
    actions: PropTypes.objectOf(PropTypes.func)
  };

  constructor() {
    super(...arguments);

    const { schemaJson } = this.props;

    this.state = {
      schemaJson,
      textAreaValue: JSON.stringify(schemaJson, null, 2)
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.schemaJson !== prevState.schemaJson) {
      const { schemaJson } = nextProps;

      return {
        schemaJson,
        textAreaValue: JSON.stringify(schemaJson, null, 2)
      };
    }

    return null;
  }

  // 表单的change事件
  handleInputTextAreaChange = (event) => {
    this.setState({ textAreaValue: event.target.value });
  };

  // 刷新表单并同步到store
  handleRedoJsonSchema = (event) => {
    const { textAreaValue } = this.state;
    const { actions } = this.props;
    const message2 = this.context.languagePack.message;
    let value = null;

    try {
      value = JSON.parse(textAreaValue);
      actions.setSchemaJson(value);
    } catch (err) {
      message.error(message2.jsonFormatError);
    }
  };

  render() {
    const { textAreaValue } = this.state;
    const { languagePack } = this.context;
    const { createForm } = languagePack;
    const message2 = languagePack.message;

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

export default JsonInputTextArea;