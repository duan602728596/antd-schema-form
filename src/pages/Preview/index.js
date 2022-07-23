import { useContext } from 'react';
import { Helmet } from 'react-helmet';
import Preview from './Preview';
import { I18NContext } from '../../components/I18N/I18N';

/* 表单预览 */
function Index(props) {
  const context = useContext(I18NContext);
  const { preview } = context.languagePack;

  return [
    <Helmet key="helmet">
      <title>{ preview.title }</title>
    </Helmet>,
    <Preview key="main" />
  ];
}

export default Index;