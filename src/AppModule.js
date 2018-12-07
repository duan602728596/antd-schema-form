import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { hot } from 'react-hot-loader';
import { storeFactory } from './store/store';
import Arrangement from './assembly/Arrangement/index';

/* 热替换 */
@hot(module)
class App extends Component{
  render(): React.Element{
    return (
      <Provider store={ storeFactory(window.__INITIAL_STATE__ || {}) }>
        <LocaleProvider locale={ zhCN }>
          <HashRouter>
            <Arrangement />
          </HashRouter>
        </LocaleProvider>
      </Provider>
    );
  }
}

export default App;