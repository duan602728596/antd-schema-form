import React, { useContext } from 'react';
import Helmet from 'react-helmet';
import loadReducer from '../../store/loadReducer';
import reducer from './reducer/reducer';
import Preview from './Preview';
import { I18NContext } from '../../components/I18N/I18N';

function ModuleLayout(props) {
  const context = useContext(I18NContext);
  const { preview } = context.languagePack;

  return [
    <Helmet key="helmet">
      <title>{ preview.title }</title>
    </Helmet>,
    <Preview key="main" />
  ];
}

export default loadReducer(reducer)(ModuleLayout);