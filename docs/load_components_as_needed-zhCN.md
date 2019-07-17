## 按需加载组件

如果你不想加载所有的组件，你可以这么做：

```javascript
import React from 'react';
import { render } from 'react-dom';
import SchemaForm from 'antd-schema-form/es/SchemaForm';

// 只加载你需要的组件
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
      // 你也可以自定义默认的组件
      defaultString,
      defaultNumber,
      defaultBoolean,
      defaultArray,
      defaultObject,
      defaultOneOf
      // ...其他的自定义组件
    }}
  />
);
```

默认的所有组件可以在[这里](https://github.com/duan602728596/antd-schema-form/blob/master/src/customComponent.ts)查看。