import React from 'react';
import { Row, Col } from 'antd';
import style from './createForm.sass';
import JsonInputTextArea from './JsonInputTextArea';
import ChangeJson from './ChangeJson';
import { I18NContext } from '../../components/I18N/I18N';

function CreateForm(props) {
  return (
    <I18NContext.Consumer>
      {
        (context) => {
          const { createForm } = context.languagePack;

          return [
            <p key="introduction">{ createForm.introduction }</p>,
            <Row key="row" type="flex" gutter={ 10 }>
              <Col className={ style.mediaMb10 } xs={ 24 } sm={ 24 } md={ 8 }>
                <JsonInputTextArea />
              </Col>
              <Col xs={ 24 } sm={ 24 } md={ 16 }>
                <ChangeJson />
              </Col>
            </Row>
          ];
        }
      }
    </I18NContext.Consumer>
  );
}

export default CreateForm;