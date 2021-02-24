import { useContext } from 'react';
import style from './createForm.sass';
import JsonInputTextarea from './JsonInputTextarea';
import ChangeJson from './ChangeJson';
import { I18NContext } from '../../components/I18N/I18N';

/* 表单创建 */
function CreateForm(props) {
  const context = useContext(I18NContext);
  const { createForm } = context.languagePack;

  return [
    <p key="introduction">{ createForm.introduction }</p>,
    <div key="main" className={ style.flexBox }>
      <div className={ style.flexLeftBox }>
        <JsonInputTextarea />
      </div>
      <div className={ style.flexRightBox }>
        <ChangeJson />
      </div>
    </div>
  ];
}

export default CreateForm;