import { createRoot } from 'react-dom/client';
import '@ant-design/v5-patch-for-react-19';
import style from './index.sass';
import Form from './modules/Form';

const root = createRoot(document.getElementById('app'));

/* app */
root.render(
  <div className={ style.main }>
    <Form />
  </div>
);