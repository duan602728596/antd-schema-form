import React, { Component, Fragment, createRef } from 'react';
import classNames from 'classnames';
import { Row, Col, Modal } from 'antd';
import SchemaForm from 'antd-schema-form/es/index';
import 'antd-schema-form/style/antd-schema-form.css';
import hljs from 'highlightjs';
import 'highlightjs/styles/github-gist.css';
import style from './style.sass';
import demo from './demo.json';

class Index extends Component{
  codeRef: Object = createRef();

  componentDidMount(): void{
    hljs.highlightBlock(this.codeRef.current);
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
  render(): React.Element{
    return (
      <Fragment>
        <p className={ style.desc }>
          antd-schema-form基于
          <a href="https://ant.design/index-cn" target="_blank" rel="noopener noreferrer">Ant Design</a>
          ，可以通过
          <a href="http://json-schema.org/draft-07/json-schema-validation.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            JSON Schema
          </a>
          配置快速生成可交互的表单。
        </p>
        <p className={ style.desc }>这个Demo简单的展示了通过配置schema.json构建一个表单。</p>
        <Row type="flex" gutter={ 10 }>
          <Col className={ style.mb10 } xs={ 24 } sm={ 24 } md={ 12 }>
            <h4>表单：</h4>
            <SchemaForm json={ demo }  onOk={ this.handleOnFormOkClick } />
          </Col>
          <Col xs={ 24 } sm={ 24 } md={ 12 }>
            <h4>schema.json：</h4>
            <pre className={ style.codePre }>
              <code ref={ this.codeRef } className={ classNames('json', style.code) }>
                { JSON.stringify(demo, null, 2) }
              </code>
            </pre>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default Index;