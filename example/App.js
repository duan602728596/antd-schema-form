import React, { Component } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { hot } from 'react-hot-loader';
import style from './style.sass';
import Form from './modules/Form';

/* 热替换 */
@hot(module)
class App extends Component {
  render() {
    return (
      <ConfigProvider locale={ zhCN }>
        <div className={ style.box }>
          <Form />
        </div>
      </ConfigProvider>
    );
  }
}

export default App;