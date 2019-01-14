import React, { Component } from 'react';
import { Spin, Icon } from 'antd';
import style from './style.sass';

function SwitchLoading(props: Object): React.Element{
  return (
    <div className={ style.loadingBox }>
      <div className={ style.loading }>
        <Spin indicator={ <Icon className={ style.loadingIcon } type="loading" /> } />
        <span>加载中...</span>
      </div>
    </div>
  );
}

export default SwitchLoading;