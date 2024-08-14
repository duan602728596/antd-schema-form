import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import 'antd/dist/reset.css';
import { storeFactory } from './store/store';
import Layout from './layouts/Layout/index';
import { I18N } from './components/I18N/I18N';
import './index.global.sass';

/* app */
const root = createRoot(document.getElementById('app'));

root.render(
  <Provider store={ storeFactory() }>
    <I18N>
      <HashRouter>
        <Layout />
      </HashRouter>
    </I18N>
  </Provider>
);

if (module.hot) {
  module.hot.accept();
}