# antd-schema-form

antd-schema-form基于[Ant Design](https://ant.design/)，可以通过[JSON Schema](http://json-schema.org/draft-07/json-schema-validation.html#rfc.section.10.3)配置快速生成可交互的表单。

## 开始使用

```javascript
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Schemaform, { 
  getKeysFromObject,  // 获取schema.json下所有的key
  getObjectFromValue, // object对象，格式化成表单需要的值
  getValueFromObject. // 从form获取到的表单的值，格式化成object对象
} from 'antd-schema-form';
import 'antd-schema-form/style/antd-schema-form.css'; // 引入样式

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

| 参数  | 说明 | 类型 |
| --- | --- | --- |
| json | json schema，必需 | object |
| value | 表单的值 | object |
| onOk | 表单的确认事件 | (form: object, value: object, keys: Array&lt;string&gt;) => void |
| onCancel | 表单的取消事件 | (form: object) => void |
| okText | 确认按钮文字 | string |
| cancelText | 取消按钮文字 | string |
| footer | 自定义底部内容 |  (form: object) => React.Node  |
| onUpload | 文件上传事件 | (file: Array&lt;File&gt;) => Promise&lt;string&gt; |

## json schema配置

表单根据json schema配置，json schema属性参考[http://json-schema.org/draft-07/json-schema-validation.html#rfc.section.10.3](http://json-schema.org/draft-07/json-schema-validation.html#rfc.section.10.3)。   
由于json schema的属性并不能完全满足表单的生成，所以也添加了一些自定义的属性，自定义的属性名称约定以`$`开头。

### 属性

* `id: string`：当前属性的id。一般约定以`$root`开头，以`/`作为分隔，例如`$root/key1/key2`。
  当type为`object`时，需要加`/properties/`，例如：
  
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
  
  当type为`array`时，items需要加`/items/`，例如：
  
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
  
* `type: string`：数据类型，包括string、number、integer、boolean、array、object。schema form根据该类型渲染不同的组件。
* `title: string`：标题，用于描述关键字的作用。表单的标题。
* `description: string`：说明，用于描述关键字的作用。表单的描述。

### 当`type="object"`时，下面的属性生效：

* `properties: object`：当**type**为**object**时，列出对象下面的属性。
* `required: Array<string>`：对象必须包含的属性。不同于`$required`属性。

### 当`type="string"`时，下面的属性生效：

* `$required: boolean`：当前的对象值必须存在。对应表单的required验证。
* `$requiredMessage: string`：自定义required的验证失败提示信息。
* `pattern: string`：正则表达式验证。
* `$patternOption: string`：用于指定全局匹配、区分大小写的匹配和多行匹配。
* `$patternMessage: string`：自定义pattern的验证失败提示信息。
* `minLength: number`：字符串的最小长度验证。
* `$minLengthMessage: string`：自定义minLength的验证失败提示信息。
* `maxLength: number`：字符串的最大长度验证。
* `$maxLengthMessage: string`：自定义maxLength的验证失败提示信息。
* `$length: number`：字符串的指定长度验证。
* `$lengthMessage: string`：自定义$length的验证失败提示信息。
* `enum: Array<string>`：验证表单控件的值必须在此关键字的数组值中。
* `$enumMessage: string`：自定义enum的验证失败信息。
* `$readOnly: boolean`：表单控件只读。
* `$placeholder: string`：表单控件的placeholder属性。
* `$defaultValue: string`：表单控件的默认值。
* `$componentType: string`：渲染为其他组件。

  | 值 | 组件名称 |
  | --- | --- | 
  | textArea | 文本域 |
  | select | 下拉框 |
  | radio | 单选框 |
  | date | 日期选择器 |
  | upload | 文件上传 |
  
* `$options: Array<{ label: string, value: string }>`：当$componentType为select、radio时，可选的选项。
  
### 当`type="number"`或`type="integer"`时，下面的属性生效：

* `$required: boolean`：当前的对象值必须存在。对应表单的required验证。
* `$requiredMessage: string`：自定义required的验证失败提示信息。
* `minimum: number`：表单的最小值。
* `$minimumMessage: string`：自定义minimum的验证失败提示信息。
* `maximum: number`：表单的最大值。
* `$maximumMessage: string`：自定义maximum的验证失败提示信息。
* `$integer: boolean`：必须是整数。当type为integer时，默认验证此项。
* `$integerMessage: string`：自定义$integer的验证失败提示信息。
* `enum: Array<number>`：验证表单控件的值必须在此关键字的数组值中。
* `$enumMessage: string`：自定义enum的验证失败信息。
* `$readOnly: boolean`：表单控件只读。
* `$placeholder: string`：表单控件的placeholder属性。
* `$defaultValue: number`：表单控件的默认值。
* `$componentType: string`：渲染为其他组件。

  | 值 | 组件名称 |
  | --- | --- | 
  | radio | 单选框 |
  
* `$options: Array<{ label: string, value: number }>`：当$componentType为radio时，可选的选项。

### 当`type="boolean"`时，下面的属性生效：

* `$defaultValue: boolean`：表单控件的默认值。
* `$componentType: string`：渲染为其他组件。

  | 值 | 组件名称 |
  | --- | --- | 
  | switch | 开关 |
  
### 当`type="array"`时，下面的属性生效：

* `items: object`：数组的内容。
* `$defaultValue: Array<any>`：表单控件的默认值。
* `$componentType: string`：渲染为其他组件。

  | 值 | 组件名称 |
  | --- | --- | 
  | checkbox | 多选框 |
  | multiple | 下拉框的多选模式 |
  
* `$options: Array<{ label: string, value: string | number }>`：当$componentType为checkbox、multiple时，可选的选项。

## 开发和测试

* 运行命令`npm run example-dll`、`npm run example-start`，在浏览器中输入`http://127.0.0.1:5050`查看demo。
* 运行命令`npm run example-dll`、`npm run test`，在浏览器中输入`http://127.0.0.1:6060`运行测试用例。


