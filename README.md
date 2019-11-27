# antd-schema-form

[![NPM version][antd-schema-form-image]][antd-schema-form-url]
[![NPM version][react-image]][react-url]
[![NPM version][react-dom-image]][react-dom-url]
[![NPM version][ant-design-image]][ant-design-url]

[antd-schema-form-image]: https://img.shields.io/badge/antd--schema--form-3.0.1-blue.svg
[antd-schema-form-url]: https://www.npmjs.com/package/antd-schema-form

[react-image]: https://img.shields.io/badge/react-%3E=16.7.0-red.svg
[react-url]: https://github.com/facebook/react

[react-dom-image]: https://img.shields.io/badge/react--dom-%3E=16.7.0-red.svg
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
    test: /node_modules[\\/]antd-schema-form[\\/].*\.jsx?$/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          plugins: [
            [
              'import',
              {
                libraryName: 'antd',
                libraryDirectory: 'es',
                style: 'css'
              }
            ]
          ]
        }
      }
    ]
  }
  ```

3. React version `>=16.7.0`.
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
    id: '$root',
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

| Parameter         | Description                                                                 | Type                   |
| ---               | ---                                                                         | ---                    |
| json              | Json schema, required.                                                      | object                 |
| value             | Form value.                                                                 | object                 |
| onOk              | Form confirmation event.                                                    | (form: object, value: object, keys: Array&lt;string&gt;) => void |
| onCancel          | Form cancellation event.                                                    | (form: object) => void |
| okText            | Confirm button text.                                                        | string                 |
| cancelText        | Cancel button text.                                                         | string                 |
| footer            | Custom bottom content, onOk event [reference](https://github.com/duan602728596/antd-schema-form/blob/master/src/components/FormObject/FormObject.tsx#L185) | (form: object) => React.Node |
| customComponent   | Custom rendering component, [reference](docs/custom_rendering_component.md) | object                 |
| customTableRender | Custom table column rendering component, [reference](docs/custom_rendering_component.md#custom-table-column-rendering-component) | object |
| languagePack      | Language configuration, [reference](language/default.json)                  | object                 |
| formOptions       | Options of `Form.create`, [reference](https://ant.design/components/form/#Form.create(options)) | object                 |

## [Json schema configuration](docs/json_schema_configuration.md)

## [Custom rendering component](docs/custom_rendering_component.md)

## [Load components as needed](docs/load_components_as_needed.md)

## Development and testing

* Run the command `npm run dev`, enter `http://127.0.0.1:5050` in the browser to view the demo and develop.
* Run the command `npm run build` and `npm run test`, and run `http://127.0.0.1:6060` in the browser to run the test case.
