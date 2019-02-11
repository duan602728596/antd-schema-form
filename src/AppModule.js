// @flow
import * as React from 'react';
import { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { hot } from '@sweet/milktea/react-hot-loader';
import { storeFactory } from './store/store';
import Arrangement from './assembly/Arrangement';

/* 热替换 */
@hot(module)
class App extends Component<{}>{
  render(): React.Node{
    return (
      <Provider store={ storeFactory(window.__INITIAL_STATE__ || {}) }>
        <LocaleProvider locale={ zhCN }>
          <BrowserRouter>
            <Switch>
              <Route path="/Login" component={ (props: Object): React.Node => <div>登录</div> } exact={ true } />
              <Route component={ Arrangement } exact={ true } />
            </Switch>
          </BrowserRouter>
        </LocaleProvider>
      </Provider>
    );
  }
}

export default App;