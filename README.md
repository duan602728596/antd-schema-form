# antd-schema-form

[![NPM version][antd-schema-form-image]][antd-schema-form-url]
[![NPM version][react-image]][react-url]
[![NPM version][react-dom-image]][react-dom-url]
[![NPM version][ant-design-image]][ant-design-url]

[antd-schema-form-image]: https://img.shields.io/badge/antd--schema--form-2.3.1-blue.svg
[antd-schema-form-url]: https://www.npmjs.com/package/antd-schema-form

[react-image]: https://img.shields.io/badge/react-%3E=16.6.0-red.svg
[react-url]: https://github.com/facebook/react

[react-dom-image]: https://img.shields.io/badge/react--dom-%3E=16.6.0-red.svg
[react-dom-url]: https://github.com/facebook/react

[ant-design-image]: https://img.shields.io/badge/ant--design-%3E=3.12.0-red.svg
[ant-design-url]: https://github.com/ant-design/ant-design

[中文文档](README-zhCN.md)

Antd-schema-form based [Ant Design](https://ant.design/), quickly generate interactive forms with [JSON Schema](http://json-schema.org/draft-07/json-schema-validation.html) configuration.

## Start using

1. Before using, you need to configure antd in the babel [on-demand loading](https://ant.design/docs/react/introduce#Use-modularized-antd).
2. You need to configure the babel-loader as follows:

  ```javascript
  {
    test: /node_modules[\\/]antd-schema-form$/,
    use: 'babel-loader'
  }
  ```

3. React version `>=16.6.0`.
4. Use of components:

  ```javascript
  import React, { Component } from 'react';
  import ReactDOM from 'react-dom';
  import SchemaForm, {
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
| footer | Custom bottom content, onOk event [reference](https://github.com/duan602728596/antd-schema-form/blob/master/src/components/FormObject/FormObject.tsx#L138) |  (form: object) => React.Node  |
| customComponent | Custom rendering component, [reference](#custom-rendering-component) | object |
| customTableRender | Custom table column rendering component, [reference](#custom-table-column-rendering-component) | object |
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
* `$componentType: string`: Rendered as other components (When there is no *oneOf* attribute).
* `oneOf: Array<object>`: Multiple types of keywords possible.
* `$oneOfComponentType: string`: Rendered as other component when there has an *oneOf* attribute, at this point, the `$componentType` attribute only takes effect for the schema configuration in `oneOf`. The component returned by the function [reference](https://github.com/duan602728596/antd-schema-form/blob/master/src/components/FormObject/OneOf.tsx)。
* `$oneOfIndex: number`: The index of the selected Radio.Group under *oneOf*.
* `$oneOfDisabled: boolean`: *OneOf* is disabled under Radio.Group.
* `$hidden: boolean`: Hide form fields (form values still exist).
* `$tableColumnHidden: boolean`: When the object is an object in the array and the component is a table, the column is hidden (the form value still exists).
* `$tableRender: string`: Rendering to other custom table column rendering components.

### `type="object"`:

The component renders the collapsed panel by default ([Collapse](https://ant.design/components/collapse-cn/)). **Configuration properties:**

* `properties: object`: When **type** is **object**, the attributes below the object are listed.
* `required: Array<string>`: The attributes that the object must contain. Unlike the `$required` attribute.
* `dependencies: { [key: string]: Array<string> }`: The dependency specified by the object's property. When the property has no value, the component of the dependency is not rendered; when the property has a value, the component of the dependency is rendered and the form of the dependency is required. This property does not control the rendering order of the form.

### `type="string"`:

The component renders the input box by default ([Input](https://ant.design/components/input/)). **Configuration properties:**

* `$required: boolean`: The current object value must exist. Corresponding validation of the corresponding form.
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

  | Value | Component Name |
  | --- | --- |
  | textArea | Text field. |
  | select | Drop-down box. |
  | radio | Radio box. |
  | date | Date picker. (**When the component is a date picker, the value is a Moment object, and you need to process the value of the date yourself.**) |
  | password | Password box. |

* `$options: Array<{ label: string, value: string }>`: Optional when $componentType is select, radio.

### `type="number"` or `type="integer"`:

The component renders the numeric input box by default ([InputNumber](https://ant.design/components/input-number/)). **Configuration properties:**

* `$required: boolean`: The current object value must exist. Corresponding validation of the corresponding form.
* `$requiredMessage: string`: Customize the required verification failure message.
* `minimum: number`: The minimum value of the form.
* `$minimumMessage: string`: Customize the verification failure message for the minimum.
* `maximum: number`: The maximum value of the form.
* `$maximumMessage: string`: Customize the verification failure message for maximum.
* `$integer: boolean`: Must be an integer. When type is integer, this item is verified by default.
* `$integerMessage: string`: Customize the authentication failure message for $integer.
* `enum: Array<number>`: Verify that the value of the form control must be in the array value of this keyword.
* `$enumMessage: string`: Customize the enum's validation failure message.
* `$readOnly: boolean`: The form control is read-only.
* `$placeholder: string`: The placeholder property of the form control.
* `$defaultValue: number`: The default value of the form control.

  | Value | Component Name |
  | --- | --- |
  | radio | Radio box. |

* `$options: Array<{ label: string, value: number }>`: Optional option when $componentType is radio.

### `type="boolean"`:

The component renders a checkbox by default ([Checkbox](https://ant.design/components/checkbox/)). **Configuration properties:**

* `$defaultValue: boolean`: The default value of the form control.

  | Value | Component Name |
  | --- | --- |
  | switch | Switch. |

### `type="array"`:

The component renders the table by default ([Table](https://ant.design/components/table/)).Click on the number of rows in the table to modify the location of the data. **Configuration properties:**

* `items: object`: the contents of the array.
* `$defaultValue: Array<any>`: The default value of the form control.
* `minimum: number`: the minimum value of the form.
* `$minimumMessage: string`: Customize the verification failure message for the minimum.
* `maximum: number`: the maximum value of the form.
* `$maximumMessage: string`: Customize the verification failure message for maximum.
* `$addDataInReverseOrder: boolean`: When set to `true`, data is inserted into the header when the table component adds data.

  | Value | Component Name |
  | --- | --- |
  | checkbox | Multiple checkbox. |
  | multiple | Drop-down box multiple selection mode. |
  | tags | Multi-select mode for drop-down box, and you can enter text. |

* `$options: Array<{ label: string, value: string | number }>`: Optional when $componentType is checkbox, multiple, tags.

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
   * @param { GetFieldDecoratorOptions } option: getFieldDecorator option parameter
   * @param { object } form: antd form object
   * @param { boolean } required: whether the form value must exist
   */
  custom(item, option, form, required){
    const { getFieldDecorator } = form;

    return getFieldDecorator(item.id, option) (
      <Input placeholder="Custom rendering component." required={ required } />
    );
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

| Parameter | Description | Type |
| --- | --- | --- |
| item | Information about the id, title, etc. Json schema required by the current. | component | object |
| option | Form configuration for form.getFieldDecorator. | object |
| form | Antd's form object. | object |
| required | Field required | boolean |

When the `type` attribute is `object`, the value type is `(item, form, element) => React.Node`.

| Parameter | Description | Type |
| --- | --- | --- |
| item | Information about the id, title, etc. Json schema required by the current. | component | object |
| form | Antd's form object. | object |
| element | Rendered React component | React.ReactNodeArray &#124;&#124; React.ReactNode |

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

| Parameter | Description | Type |
| --- | --- | --- |
| value | Currently rendered value. | any |
| record | Current column of data information. | object |
| index | Column index. | number |
| item | Information about json schema such as id and title. | object |
| form | Antd's form object. | object |

## Development and testing

* Run the command `npm run dev`, enter `http://127.0.0.1:5050` in the browser to view the demo and develop.
* Run the command `npm run build` and `npm run test`, and run `http://127.0.0.1:6060` in the browser to run the test case.
