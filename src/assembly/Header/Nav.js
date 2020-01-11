import React from 'react';
import { Link } from 'react-router-dom';
import {
  HomeTwoTone as IconHomeTwoTone,
  FileTextTwoTone as IconFileTextTwoTone,
  EyeTwoTone as IconEyeTwoTone,
  BookTwoTone as IconBookTwoTone
} from '@ant-design/icons';
import style from './style.sass';
import { I18NContext } from '../../components/I18N/I18N';

function Nav(props) {
  return (
    <nav>
      <I18NContext.Consumer>
        {
          (context) => {
            const { language, languagePack } = context;
            const nav = languagePack.nav;
            const docUrl = language === 'zh-cn'
              ? 'https://github.com/duan602728596/antd-schema-form/blob/master/README-zhCN.md#antd-schema-form'
              : 'https://github.com/duan602728596/antd-schema-form#antd-schema-form';

            return (
              <ul className={ style.navList }>
                <li>
                  <Link to="/">
                    <IconHomeTwoTone />
                    <span>{ nav[0] }</span>
                  </Link>
                </li>
                <li>
                  <Link to="/CreateForm">
                    <IconFileTextTwoTone />
                    <span>{ nav[1] }</span>
                  </Link>
                </li>
                <li>
                  <Link to="/Preview">
                    <IconEyeTwoTone />
                    <span>{ nav[2] }</span>
                  </Link>
                </li>
                <li>
                  <a href={ docUrl } target="_blank" rel="noopener noreferrer">
                    <IconBookTwoTone />
                    <span>{ nav[3] }</span>
                  </a>
                </li>
              </ul>
            );
          }
        }
      </I18NContext.Consumer>
    </nav>
  );
}

export default Nav;