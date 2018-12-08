import React, { Component } from 'react';
import { Row, Col } from 'antd';
import style from './style.sass';
import JsonInputTextArea from './JsonInputTextArea';
import ChangeJson from './ChangeJson';

class Index extends Component{
  render(): React.Element{
    return (
      <Row type="flex" gutter={ 10 }>
        <Col className={ style.mb10 } xs={ 24 } sm={ 24 } md={ 12 }>
          <JsonInputTextArea />
        </Col>
        <Col xs={ 24 } sm={ 24 } md={ 12 }>
          <ChangeJson />
        </Col>
      </Row>
    );
  }
}

export default Index;