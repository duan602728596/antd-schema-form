import { createRoot } from 'react-dom/client';
import Form from './modules/Form';

const root = createRoot(document.getElementById('app'));

/* app */
root.render(
  <div style={{ padding: 10 }}>
    <Form />
  </div>
);