import { render } from 'react-dom';
import style from './style.sass';
import Form from './modules/Form';

/* app */
render(
  <div className={ style.box }>
    <Form />
  </div>,
  document.getElementById('app')
);