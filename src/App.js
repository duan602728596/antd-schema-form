import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale-provider/zh_CN';
import { hot } from '@sweet-milktea/milktea/react-hot-loader/root';
import { storeFactory } from './store/store';
import Layout from './layouts/Layout/index';
import { I18N } from './components/I18N/I18N';

/* 热替换 */
function App(props) {
  return (
    <Provider store={ storeFactory(window.__INITIAL_STATE__ || {}) }>
      <ConfigProvider locale={ zhCN }>
        <I18N>
          <HashRouter>
            <Route element={ <Layout /> } />
          </HashRouter>
        </I18N>
      </ConfigProvider>
    </Provider>
  );
}

export default hot(App);