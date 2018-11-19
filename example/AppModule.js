import React, { Component } from 'react';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { hot } from 'react-hot-loader';
import './common.sass';
import Form from './modules/Form';

/* 热替换 */
@hot(module)
class App extends Component{
  render(): React.Element{
    return (
      <LocaleProvider locale={ zhCN }>
        <div className="box">
          <Form />
        </div>
      </LocaleProvider>
    );
  }
}

export default App;