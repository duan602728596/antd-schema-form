import React, { Component } from 'react';
import { Spin, Icon } from 'antd';
import style from './style.sass';
import { I18NContext } from '../../components/I18N/I18N';

function SwitchLoading(props: Object): React.Element{
  return (
    <div className={ style.loadingBox }>
      <div className={ style.loading }>
        <Spin indicator={ <Icon className={ style.loadingIcon } type="loading" /> } />
        {
          <I18NContext.Consumer>
            { (context: Object): React.Element => <span>{ context.languagePack.switchLoading }</span> }
          </I18NContext.Consumer>
        }
      </div>
    </div>
  );
}

export default SwitchLoading;