import React, { Fragment, useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import classNames from 'classnames';
import { Button, Input, message } from 'antd';
import { CopyOutlined as IconCopyOutlined, RedoOutlined as IconRedoOutlined } from '@ant-design/icons';
import { setSchemaJson } from './models/models';
import style from './style.sass';
import { handleCopyTextClick } from '../../utils';
import { I18NContext } from '../../components/I18N/I18N';

/* state */
const state = createStructuredSelector({
  schemaJson: createSelector(
    ({ createForm: $$createForm }) => $$createForm?.get?.('schemaJson'),
    ($$data) => $$data ? $$data.toJS() : {}
  )
});

function JsonInputTextArea(props) {
  const { schemaJson } = useSelector(state);
  const dispatch = useDispatch();
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
      value |> setSchemaJson |> dispatch;
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
          icon={ <IconCopyOutlined /> }
          onClick={ handleCopyTextClick.bind(this, 'jsonSchemaTextArea', msg.copyMessage) }
        >
          { createForm.copy }
        </Button>
        <Button className={ style.mb10 } icon={ <IconRedoOutlined /> } onClick={ handleRedoJsonSchema }>
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