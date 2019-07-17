## 自定义渲染组件

自定义渲染组件允许开发者渲染个人定制的组件。

```javascript
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Schemaform from 'antd-schema-form';
import 'antd-schema-form/style/antd-schema-form.css';

const customComponent = {
  /**
   * 自定义组件
   * @param { object } item: schema对象
   * @param { GetFieldDecoratorOptions } option: form.getFieldDecorator的option参数
   * @param { object } form: antd的form对象
   * @param { boolean } required: 表单值是否必须存在
   */
  custom(item, option, form, required) {
    const { getFieldDecorator } = form;

    return getFieldDecorator(item.id, option)(
      <Input placeholder="自定义组件" required={ required } />
    );
  },

  /**
   * 当type类型为"object"时，或者含有"oneOf"属性时，自定义组件
   * @param { object } item: schema对象
   * @param { object } form: antd的form对象
   * @param { React.ReactNodeArray || React.ReactNode } element: 渲染的React组件
   */
  objectCustom(item, form, element) {
    return <div>{ element }</div>;
  },

  // ...其他自定义组件
};

const schemaJson = {
  id: '$root',
  type: 'string',
  title: '自定义渲染组件',
  $componentType: 'custom' // 自定义组件的key
};

ReactDOM.render(
  <SchemaForm json={ schemaJson } customComponent={ customComponent } />,
  document.getElementById('app')
);
```

SchemaForm的自定义组件属性`customComponent`类型为`object`，当`type`属性不为`object`时，值的类型为`(item, option, form, required) => React.Node`。
函数参数:

| 参数     | 说明                                         | 类型    |
| ---      | ---                                          | ---     |
| item     | 当前的组件需要的id、title等json schema的信息 | object  |
| option   | form.getFieldDecorator的表单配置             | object  |
| form     | antd的form对象                               | object  |
| required | 字段是否必填                                 | boolean |

当`type`属性为`object`时，值的类型为`(item, form, element) => React.Node`。

| 参数    | 说明                                         | 类型   |
| ---     | ---                                          | ---    |
| item    | 当前的组件需要的id、title等json schema的信息 | object |
| form    | antd的form对象                               | object |
| element | 渲染的React组件                              | React.ReactNodeArray &#124;&#124; React.ReactNode |

### 自定义表格列渲染组件

自定义表格列渲染组件允许开发者在表格的渲染函数中渲染个人定制的组件。

```javascript
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Schemaform from 'antd-schema-form';
import 'antd-schema-form/style/antd-schema-form.css';

const customTableRender = {
  // 自定义组件
  custom(text, record, index, item, form) {
    return <span>{ text }</span>;
  },
  // ...其他自定义组件
};

const schemaJson = {
  id: '$root',
  type: 'array',
  title: '表格列渲染组件',
  items: {
    id: '$root/items',
    type: 'object',
    title: '表格数据',
    properties: {
      data: {
        id: '$root/items/properties/data',
        type: 'string',
        title: '数据',
        $tableRender: 'custom' // 自定义表格列渲染组件的key
      }
    }
  }
};

ReactDOM.render(
  <SchemaForm json={ schemaJson } customTableRender={ customTableRender } />,
  document.getElementById('app')
);
```

SchemaForm的自定义表格列渲染组件属性`customTableRender`类型为`object`，其中的每个值的类型都为`(text, record, index, item, form) => React.Node`。
函数参数:

| 参数   | 说明                         | 类型   |
| ---    | ---                          | ---    |
| value  | 当前渲染的值                 | any    |
| record | 当前列的数据信息             | object |
| index  | 列的索引                     | number |
| item   | id、title等json schema的信息 | object |
| form   | antd的form对象               | object |