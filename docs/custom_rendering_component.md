## Custom rendering component

Custom rendering components allow developers to render custom components.

```javascript
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Schemaform from 'antd-schema-form';
import 'antd-schema-form/style/antd-schema-form.css';

const customComponent = {
  /**
   * Custom component
   * @param { object } item: schema object
   * @param { object } form: antd form object
   * @param { boolean } required: whether the form value must exist
   */
  custom(item, form, required){
    return <Input placeholder="Custom rendering component." required={ required } />;
  },
  
  /**
   * Custom component when type type is "object" or contains "oneOf" attribute
   * @param { object } item: schema object
   * @param { object } form: antd form object
   * @param { React.ReactNodeArray || React.ReactNode } element: Rendered React component
   */
   objectCustom(item, form, element) {
     return <div>{ element }</div>;
   },
   
   // ...Other custom components
};

const schemaJson = {
  id: '$root',
  type: 'string',
  title: 'Custom rendering component',
  $componentType: 'custom' // Custom component key
};

ReactDOM.render(
  <SchemaForm json={ schemaJson } customComponent={ customComponent } />,
  document.getElementById('app')
);
```

SchemaForm's custom component property `customComponent` is of type `object`, when the `type` attribute is not `object`, the type of the value is `(item, option, form, required) => React.Node`.
Function parameters:

| Parameter | Description                                                                          | Type    |
| ---       | ---                                                                                  | ---     |
| item      | Information about the id, title, etc. Json schema required by the current component. | object  |
| form      | Antd's form object.                                                                  | object  |
| required  | Field required                                                                       | boolean |

When the `type` attribute is `object`, the value type is `(item, form, element) => React.Node`.

| Parameter | Description                                                                          | Type   |
| ---       | ---                                                                                  | ---    |
| item      | Information about the id, title, etc. Json schema required by the current component. | object |
| form      | Antd's form object.                                                                  | object |
| element   | Rendered React component                                                             | React.ReactNodeArray &#124;&#124; React.ReactNode |

## Custom table column rendering component

The custom table column rendering component allows developers to render custom components in the table's render function.

```javascript
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Schemaform from 'antd-schema-form';
import 'antd-schema-form/style/antd-schema-form.css';

const customTableRender = {
  // Custom component
  custom(text, record, index, item, form) {
    return <span>{ text }</span>;
  },
  // ...Other custom components
};

const schemaJson = {
  id: '$root',
  type: 'array',
  title: 'Table column rendering component',
  items: {
    id: '$root/items',
    type: 'object',
    title: 'Table data',
    properties: {
      data: {
        id: '$root/items/properties/data',
        type: 'string',
        title: 'Data',
        $tableRender: 'custom' // Custom table column render component key
      } 
    }
  }
};

ReactDOM.render(
  <SchemaForm json={ schemaJson } customTableRender={ customTableRender } />,
  document.getElementById('app')
);
```

SchemaForm's custom table column rendering component property `customTableRender` type is `object`, Each of these values is of the type `(text, record, index, item, form) => React.Node`.
Function parameters:

| Parameter | Description                                         | Type   |
| ---       | ---                                                 | ---    |
| value     | Currently rendered value.                           | any    |
| record    | Current column of data information.                 | object |
| index     | Column index.                                       | number |
| item      | Information about json schema such as id and title. | object |
| form      | Antd's form object.                                 | object |