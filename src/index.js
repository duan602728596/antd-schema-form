import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale-provider/zh_CN';
import { storeFactory } from './store/store';
import Layout from './layouts/Layout/index';
import { I18N } from './components/I18N/I18N';

/* app */
render(
  <Provider store={ storeFactory() }>
    <ConfigProvider locale={ zhCN }>
      <I18N>
        <HashRouter>
          <Layout />
        </HashRouter>
      </I18N>
    </ConfigProvider>
  </Provider>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept();
}