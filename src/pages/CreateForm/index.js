import { useContext } from 'react';
import { Helmet } from 'react-helmet';
import CreateForm from './CreateForm';
import { I18NContext } from '../../components/I18N/I18N';

/* 表单创建 */
function Index(props) {
  const context = useContext(I18NContext);
  const { createForm } = context.languagePack;

  return [
    <Helmet key="helmet">
      <title>{ createForm.title }</title>
    </Helmet>,
    <CreateForm key="main" />
  ];
}

export default Index;