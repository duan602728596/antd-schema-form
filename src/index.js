import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css';
import zhCN from 'antd/locale/zh_CN';
import { storeFactory } from './store/store';
import Layout from './layouts/Layout/index';
import { I18N } from './components/I18N/I18N';

/* app */
const root = createRoot(document.getElementById('app'));

root.render(
  <Provider store={ storeFactory() }>
    <ConfigProvider locale={ zhCN }>
      <I18N>
        <HashRouter>
          <Layout />
        </HashRouter>
      </I18N>
    </ConfigProvider>
  </Provider>
);

if (module.hot) {
  module.hot.accept();
}