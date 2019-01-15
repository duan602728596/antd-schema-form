# antd-schema-form

[中文文档](README-zhCN.md)

Antd-schema-form based [Ant Design](https://ant.design/), quickly generate interactive forms with [JSON Schema](http://json-schema.org/draft-07/json-schema-validation.html) configuration.

## Start using

1. Before using, you need to configure antd in the babel [on-demand loading](https://ant.design/docs/react/introduce#Use-modularized-antd).
2. You need to configure the exclude of babel-loader as follows:

  ```javascript
  {
    test: /^.*\.js$/,
    use: 'babel-loader',
    exclude: /node_modules[\\/](?!antd-schema-form)/
  }
  ``` 
  
3. React version `>=16.6.0`.
4. Use of components:

  ```javascript
  import React, { Component } from 'react';
  import ReactDOM from 'react-dom';
  import Schemaform, { 
    getKeysFromObject,  // Get all the keys under schema.json
    getObjectFromValue, // Object formatted into the value required by the form
    getValueFromObject  // The value of the form obtained from the form, formatted into an object
  } from 'antd-schema-form';
  import 'antd-schema-form/style/antd-schema-form.css'; // Introducing style

  // json schema
  const json = {
    $id: '$root',
    type: 'object',
    title: '$root',
    properties: {}
  };

  ReactDOM.render(
    <SchemaForm json={ json } />,
    document.getElementById('app')
  );
 ```
 
## API

| Parameter | Description | Type |
| --- | --- | --- |
| json | Json schema, required. | object |
| value | Form value. | object |
| onOk | Form confirmation event. | (form: object, value: object, keys: Array&lt;string&gt;) => void |
| onCancel | Form cancellation event. | (form: object) => void |
| okText | Confirm button text. | string |
| cancelText | Cancel button text. | string |
| footer | Custom bottom content, [reference](https://github.com/duan602728596/antd-schema-form/blob/master/src/components/FormObject/FormObject.js#L122) |  (form: object) => React.Node  |
| onUpload | File upload event. | (file: Array&lt;File&gt;) => Promise&lt;string&gt; |
| customComponent | Custom rendering component, [reference](#custom-rendering-component) | object |
| languagePack | Language configuration, [reference](language/default.json) | object |

## Json schema configuration

The form is configured according to json schema, json schema attribute reference [http://json-schema.org/draft-07/json-schema-validation.html](http://json-schema.org/draft-07/json-schema-validation.html).

You can use [form generation](https://duan602728596.github.io/antd-schema-form/#/CreateForm) and [form preview](https://duan602728596.github.io/antd-schema-form/#/Preview) function replaces the work of a part of the handwritten json schema.

### Attributes

> Since the properties of the json schema do not fully satisfy the generation of the form, some custom properties have been added. The custom property name convention begins with `$`.

* `id: string`: The id of the current attribute. The general convention begins with `$root` and is separated by `/`. For example, `$root/key1/key2`, the id and json key names must correspond.
  When type is `object`, you need to add `/properties`, for example:
  
  ```json
  {
    "id": "$root",
    "type": "object",
    "properties": {
      "key": {
        "id": "$root/properties/key",
        "type": "string"
      }
    }
  }
  ```
  
  When type is `array`, items need to add `/items`, for example:
  
  ```json
  {
    "id": "$root",
    "type": "array",
    "items": {
      "id": "$root/items",
      "type": "string"
    }
  }
  ```

* `type: string`: data type, including string, number, integer, boolean, array, object. The schema form renders different components based on that type.
* `title: string`: Title, used to describe the role of the keyword. The title of the form.
* `description: string`: Description, used to describe the role of the keyword. A description of the form.
* `oneOf: Array<object>`: Multiple types of keywords possible.

### `type="object"`:

The component renders the collapsed panel by default ([Collapse](https://ant.design/components/collapse-cn/)). **Configuration properties: **

* `properties: object`: When **type** is **object**, the attributes below the object are listed.
* `required: Array<string>`: The attributes that the object must contain. Unlike the `$required` attribute.

### `type="string"`:

The component renders the input box by default ([Input](https://ant.design/components/input/)). **Configuration properties: **

* `required: boolean`: The current object value must exist. Corresponding validation of the corresponding form.
* `$requiredMessage: string`: Customize the required verification failure message.
* `pattern: string`: regular expression validation.
* `$patternOption: string`: Used to specify global matches, case-sensitive matches, and multi-line matches.
* `$patternMessage: string`: Custom pattern validation failure message.
* `minLength: number`: The minimum length of the string is verified.
* `$minLengthMessage: string`: Customize the verification failure message for minLength.
* `maxLength: number`: The maximum length of the string is verified.
* `$maxLengthMessage: string`: Customize the maxLength verification failure message.
* `$length: number`: The specified length of the string is verified.
* `$lengthMessage: string`: Customize the $length validation failure message.
* `enum: Array<string>`: Verify that the value of the form control must be in the array value of this keyword.
* `$enumMessage: string`: Customize the enum's validation failure message.
* `$readOnly: boolean`: The form control is read-only.
* `$placeholder: string`: The placeholder property of the form control.
* `$defaultValue: string`: The default value of the form control.
* `$componentType: string`: Rendered as other components.

  | Value | Component Name |
  | --- | --- | 
  | textArea | Text field. |
  | select | Drop-down box. |
  | radio | Radio box. |
  | date | Date picker. |
  | upload | File Upload. |
  | password | Password box. |

* `$options: Array<{ label: string, value: string }>`: Optional when $componentType is select, radio.

### `type="number"` or `type="integer"`:

The component renders the numeric input box by default ([InputNumber](https://ant.design/components/input-number/)). **Configuration properties: **

* `required: boolean`: The current object value must exist. Corresponding validation of the corresponding form.
* `$requiredMessage: string`: Customize the required verification failure message.
* `minimum: number`: the minimum value of the form.
* `$minimumMessage: string`: Customize the verification failure message for the minimum.
* `maximum: number`: the maximum value of the form.
* `$maximumMessage: string`: Customize the verification failure message for maximum.
* `$integer: boolean`: Must be an integer. When type is integer, this item is verified by default.
* `$integerMessage: string`: Customize the authentication failure message for $integer.
* `enum: Array<number>`: Verify that the value of the form control must be in the array value of this keyword.
* `$enumMessage: string`: Customize the enum's validation failure message.
* `$readOnly: boolean`: The form control is read-only.
* `$placeholder: string`: The placeholder property of the form control.
* `$defaultValue: number`: The default value of the form control.
* `$componentType: string`: Rendered as other components.

  | Value | Component Name |
  | --- | --- | 
  | radio | Radio box. |

* `$options: Array<{ label: string, value: number }>`: Optional option when $componentType is radio.

### `type="boolean"`:

The component renders a checkbox by default ([Checkbox](https://ant.design/components/checkbox/)). **Configuration properties: **

* `$defaultValue: boolean`: The default value of the form control.
* `$componentType: string`: Rendered as other components.

  | Value | Component Name |
  | --- | --- | 
  | switch | Switch. |

### `type="array"`:

The component renders the table by default ([Table](https://ant.design/components/table/)). **Configuration properties: **
 
* `items: object`: the contents of the array.
* `$defaultValue: Array<any>`: The default value of the form control.
* `$componentType: string`: Rendered as other components.

  | Value | Component Name |
  | --- | --- |
  | checkbox | Multiple checkbox. |
  | multiple | Drop-down box multiple selection mode. |

* `$options: Array<{ label: string, value: string | number }>`: Optional when $componentType is checkbox, multiple.

## Custom rendering component

Custom rendering components allow developers to render custom components.

```javascript
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Schemaform from 'antd-schema-form';
import 'antd-schema-form/style/antd-schema-form.css';

const customComponent = {
  // Custom component
  custom(item, option, form, required){
    const { getFieldDecorator } = form;

    return getFieldDecorator(item.id, option)(
      <Input placeholder="Custom rendering component." required={ required } />
    );
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

SchemaForm's custom component property `customComponent` is of type `object`, each of which has the type `(item, option, form, required) => React.Node`.   
Function parameters:

| Parameter | Description | Type |
| --- | --- | --- |
| item | Information about the id, title, etc. Json schema required by the current. | component | object |
| option | Form configuration for form.getFieldDecorator. | object |
| form | Antd's form object. | object |
| required | Field required | boolean |

## Development and testing

* Run the command `npm run dll`, `npm run dev`, enter `http://127.0.0.1:5050` in the browser to view the demo and develop.
* Run the command `npm run dll`, `npm run test`, and run `http://127.0.0.1:6060` in the browser to run the test case.
