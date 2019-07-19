import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { hot } from '@sweet-milktea/milktea/react-hot-loader';
import { storeFactory } from './store/store';
import Arrangement from './assembly/Arrangement/index';
import { I18N } from './components/I18N/I18N';

/* 热替换 */
function App(props) {
  return (
    <Provider store={ storeFactory(window.__INITIAL_STATE__ || {}) }>
      <LocaleProvider locale={ zhCN }>
        <I18N>
          <HashRouter>
            <Switch>
              <Route component={ Arrangement } exact={ true } />
            </Switch>
          </HashRouter>
        </I18N>
      </LocaleProvider>
    </Provider>
  );
}

export default hot(module)(App);