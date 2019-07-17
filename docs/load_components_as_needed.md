## Load components as needed

If you don't want to load all the components, you can do this:

```javascript
import React from 'react';
import { render } from 'react-dom';
import SchemaForm from 'antd-schema-form/es/SchemaForm';

// Load only the components you need.
import {
  defaultString,
  defaultNumber,
  defaultBoolean,
  defaultArray,
  defaultObject,
  defaultOneOf
} from 'antd-schema-form/es/components/custom/custom';

render(
  <SchemaForm
    customComponent={{
      // You can also customize the default components.
      defaultString,
      defaultNumber,
      defaultBoolean,
      defaultArray,
      defaultObject,
      defaultOneOf
      // ...Other custom components.
    }}
  />
);
```

The default components are available for viewing [here](https://github.com/duan602728596/antd-schema-form/blob/master/src/customComponent.ts).