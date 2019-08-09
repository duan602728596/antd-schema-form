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

antd-schema-form基于[Ant Design](https://ant.design/)，可以通过[JSON Schema](http://json-schema.org/draft-07/json-schema-validation.html)配置快速生成可交互的表单。

这个[Demo](https://duan602728596.github.io/antd-schema-form/#/)简单的展示了通过配置schema.json构建一个表单。

## 开始使用

1. 在使用之前，你需要在babel配置antd的[按需加载](https://ant.design/docs/react/introduce-cn#按需加载)。
2. 需要为babel-loader做如下配置:

  ```javascript
  {
    test: /node_modules[\\/]antd-schema-form[\\/].*\.jsx$/,
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

3. React的版本`>=16.7.0`。
4. 组件的使用:

  ```javascript
  import React, { Component } from 'react';
  import ReactDOM from 'react-dom';
  import SchemaForm, {
    getKeysFromObject,  // 获取schema.json下所有的key
    getObjectFromValue, // object对象，格式化成表单需要的值
    getValueFromObject  // 从form获取到的表单的值，格式化成object对象
  } from 'antd-schema-form';
  import 'antd-schema-form/style/antd-schema-form.css'; // 引入样式

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

| 参数              | 说明                                                            | 类型                   |
| ---               | ---                                                             | ---                    |
| json              | json schema，必需                                               | object                 |
| value             | 表单的值                                                        | object                 |
| onOk              | 表单的确认事件                                                  | (form: object, value: object, keys: Array&lt;string&gt;) => void |
| onCancel          | 表单的取消事件                                                  | (form: object) => void |
| okText            | 确认按钮文字                                                    | string                 |
| cancelText        | 取消按钮文字                                                    | string                 |
| footer            | 自定义底部内容，onOk事件[参考](https://github.com/duan602728596/antd-schema-form/blob/master/src/components/FormObject/FormObject.tsx#L185) | (form: object) => React.Node |
| customComponent   | 自定义渲染组件，[参考](docs/custom_rendering_component-zhCN.md) | object                 |
| customTableRender | 自定义表格列渲染组件，[参考](docs/custom_rendering_component-zhCN.md#自定义表格列渲染组件) | object                 |
| languagePack      | 语言配置，[参考](language/zh-CN.json)                           | object                 |

## [json schema配置](docs/json_schema_configuration-zhCN.md)

## [自定义渲染组件](docs/custom_rendering_component-zhCN.md)

## [按需加载组件](docs/load_components_as_needed-zhCN.md)

## 开发和测试

* 运行命令`npm run dev`，在浏览器中输入`http://127.0.0.1:5050`查看demo并开发。
* 运行命令`npm run build`和`npm run test`，在浏览器中输入`http://127.0.0.1:6060`运行测试用例。
