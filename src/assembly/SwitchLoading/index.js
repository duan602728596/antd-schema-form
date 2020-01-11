import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined as IconLoadingOutlined } from '@ant-design/icons';
import style from './style.sass';
import { I18NContext } from '../../components/I18N/I18N';

function SwitchLoading(props) {
  return (
    <div className={ style.loadingBox }>
      <div className={ style.loading }>
        <Spin indicator={ <IconLoadingOutlined className={ style.loadingIcon } /> } />
        <I18NContext.Consumer>
          { (context) => <span>{ context.languagePack.switchLoading }</span> }
        </I18NContext.Consumer>
      </div>
    </div>
  );
}

export default SwitchLoading;