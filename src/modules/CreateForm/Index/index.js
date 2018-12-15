import React, { Component, Fragment } from 'react';
import { Row, Col } from 'antd';
import style from './style.sass';
import JsonInputTextArea from './JsonInputTextArea';
import ChangeJson from './ChangeJson';

class Index extends Component{
  render(): React.Element{
    return (
      <Fragment>
        <p>你可以通过配置功能来配置一个表单。</p>
        <Row type="flex" gutter={ 10 }>
          <Col className={ style.mb10 } xs={ 24 } sm={ 24 } md={ 8 }>
            <JsonInputTextArea />
          </Col>
          <Col xs={ 24 } sm={ 24 } md={ 16 }>
            <ChangeJson />
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default Index;