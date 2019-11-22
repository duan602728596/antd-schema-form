import React, { Fragment, useState, useEffect, useContext } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import classNames from 'classnames';
import { Button, Input, message } from 'antd';
import useActions from '../../../store/useActions';
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
  action: bindActionCreators({
    setSchemaJson
  }, dispatch)
});

function JsonInputTextArea(props) {
  const { schemaJson } = useSelector(state);
  const { action } = useActions(actions);
  const context = useContext(I18NContext);
  const [textAreaValue, setTextAreaValue] = useState(JSON.stringify(schemaJson, null, 2));

  const { languagePack } = context;
  const { createForm } = languagePack;
  const msg = languagePack.message;

  // 表单的change事件
  function handleInputTextAreaChange(event) {
    setTextAreaValue(event.target.value);
  }

  // 刷新表单并同步到store
  function handleRedoJsonSchema(event) {
    let value = null;

    try {
      value = JSON.parse(textAreaValue);
      action.setSchemaJson(value);
    } catch (err) {
      message.error(msg.jsonFormatError);
    }
  }

  useEffect(function() {
    setTextAreaValue(JSON.stringify(schemaJson, null, 2));
  }, [schemaJson]);

  return (
    <Fragment>
      <div>
        <Button className={ classNames(style.mr10, style.mb10) }
          icon="copy"
          onClick={ handleCopyTextClick.bind(this, 'jsonSchemaTextArea', msg.copyMessage) }
        >
          { createForm.copy }
        </Button>
        <Button className={ style.mb10 } icon="redo" onClick={ handleRedoJsonSchema }>
          { createForm.refreshFormConfiguration }
        </Button>
      </div>
      <Input.TextArea id="jsonSchemaTextArea"
        rows={ 20 }
        value={ textAreaValue }
        onChange={ handleInputTextAreaChange }
      />
    </Fragment>
  );
}

export default JsonInputTextArea;