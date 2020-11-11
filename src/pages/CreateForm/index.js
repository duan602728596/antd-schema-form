import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import loadModels from '../../store/loadModels';
import models from './models/models';
import CreateForm from './CreateForm';
import { I18NContext } from '../../components/I18N/I18N';

function ModuleLayout(props) {
  const context = useContext(I18NContext);
  const { createForm } = context.languagePack;

  return [
    <Helmet key="helmet">
      <title>{ createForm.title }</title>
    </Helmet>,
    <CreateForm key="main" />
  ];
}

export default loadModels(models)(ModuleLayout);