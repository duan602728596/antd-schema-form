import { useContext } from 'react';
import { Tag } from 'antd';
import style from './createForm.sass';
import JsonInputTextarea from './JsonInputTextarea/JsonInputTextarea';
import ChangeJson from './ChangeJson/ChangeJson';
import { I18NContext } from '../../components/I18N/I18N';

/* 表单创建 */
function CreateForm(props) {
  const context = useContext(I18NContext);
  const { createForm } = context.languagePack;

  return [
    <p key="introduction">
      { createForm.introduction[0] }
      { createForm.introduction[1] }
      <Tag className={ style.introductionTag } color="#f50">{ '/?q={{ encodeURIComponent(json) }}' }</Tag>
      { createForm.introduction[2] }
    </p>,
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