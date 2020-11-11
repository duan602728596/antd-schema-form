import { Layout as AntdLayout } from 'antd';
import style from './index.sass';
import Header from '../Header/index';
import Routers from '../../router/Routers';

function Layout(props) {
  return (
    <AntdLayout className={ style.arrangement }>
      <Header />
      <AntdLayout.Content className={ style.content }>
        <Routers />
      </AntdLayout.Content>
    </AntdLayout>
  );
}

export default Layout;