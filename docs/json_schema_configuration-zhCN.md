## json schema配置

表单根据json schema配置，json schema属性参考[http://json-schema.org/draft-07/json-schema-validation.html](http://json-schema.org/draft-07/json-schema-validation.html)。

您可以通过[表单生成](https://duan602728596.github.io/antd-schema-form/#/CreateForm)和[表单预览](https://duan602728596.github.io/antd-schema-form/#/Preview)功能来代替一部分的手写json schema的工作。

### 属性

> 由于json schema的属性并不能完全满足表单的生成，所以也添加了一些自定义的属性，自定义的属性名称约定以`$`开头。

* `id: string`: 当前属性的id。一般约定以`$root`开头，以`/`作为分隔，例如`$root/key1/key2`，id和json的键名要对应。
  当type为`object`时，需要加`/properties`，例如:

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

  当type为`array`时，items需要加`/items`，例如:

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

* `type: string`: 数据类型，包括string、number、integer、boolean、array、object。schema form根据该类型渲染不同的组件。
* `title: string`: 标题，用于描述关键字的作用。表单的标题。
* `description: string`: 说明，用于描述关键字的作用。表单的描述。
* `$componentType: string`: 渲染为其他组件（当没有*oneOf*属性时）。
* `$order: number`: 定义组件的排列顺序。数值越小，排列越靠前。当没有配置该属性时，默认为0。
* `oneOf: Array<object>`: 关键字可能的多个类型。
* `$oneOfComponentType: string`: 当有*oneOf*属性时，渲染为其他组件，此时`$componentType`属性只对`oneOf`内的schema配置生效。函数返回的组件[参考](https://github.com/duan602728596/antd-schema-form/blob/master/src/components/FormObject/OneOf.tsx)。
* `$oneOfIndex: number`: *oneOf*下选中的Radio.Group的索引。
* `$oneOfDisabled: boolean`: *oneOf*下Radio.Group禁止切换。
* `$hidden: boolean`: 隐藏表单域（表单值仍然存在）。
* `$tableColumnHidden: boolean`: 为数组内的对象且组件为表格时，隐藏列（表单值仍然存在）。
* `$tableRender: string`: 渲染为其他的自定义表格列渲染组件。

### `type="object"`:

组件默认渲染折叠面板（[Collapse](https://ant.design/components/collapse-cn/)）。**配置属性：**

* `properties: object`: 当**type**为**object**时，列出对象下面的属性。
* `required: Array<string>`: 对象必须包含的属性。不同于`$required`属性。
* `dependencies: { [key: string]: Array<string> }`: 对象的属性指定的依赖项。当该属性没有值时，依赖项的组件不会被渲染；当该属性有值时，依赖项的组件会渲染，且依赖项的表单必填。该属性不会控制表单的渲染顺序。

### `type="string"`:

组件默认渲染输入框（[Input](https://ant.design/components/input-cn/)）。**配置属性：**

* `$required: boolean`: 当前的对象值必须存在。对应表单的required验证。
* `$requiredMessage: string`: 自定义required的验证失败提示信息。
* `pattern: string`: 正则表达式验证。
* `$patternOption: string`: 用于指定全局匹配、区分大小写的匹配和多行匹配。
* `$patternMessage: string`: 自定义pattern的验证失败提示信息。
* `minLength: number`: 字符串的最小长度验证。
* `$minLengthMessage: string`: 自定义minLength的验证失败提示信息。
* `maxLength: number`: 字符串的最大长度验证。
* `$maxLengthMessage: string`: 自定义maxLength的验证失败提示信息。
* `$length: number`: 字符串的指定长度验证。
* `$lengthMessage: string`: 自定义$length的验证失败提示信息。
* `enum: Array<string>`: 验证表单控件的值必须在此关键字的数组值中。
* `$enumMessage: string`: 自定义enum的验证失败信息。
* `$readOnly: boolean`: 表单控件只读。
* `$placeholder: string`: 表单控件的placeholder属性。
* `$defaultValue: string`: 表单控件的默认值。

  | 值       | 组件名称 |
  | ---      | ---      |
  | textArea | 文本域                                                                                |
  | select   | 下拉框                                                                                |
  | radio    | 单选框                                                                                |
  | date     | 日期选择器（**当组件为日期选择器时，值为Moment对象，需要自行对日期的值进行处理**） |
  | password | 密码框                                                                                |

* `$options: Array<{ label: string, value: string }>`: 当$componentType为select、radio时，可选的选项。

### `type="number"`或`type="integer"`:

组件默认渲染数字输入框（[InputNumber](https://ant.design/components/input-number-cn/)）。**配置属性：**

* `$required: boolean`: 当前的对象值必须存在。对应表单的required验证。
* `$requiredMessage: string`: 自定义required的验证失败提示信息。
* `minimum: number`: 表单的最小值。
* `$minimumMessage: string`: 自定义minimum的验证失败提示信息。
* `maximum: number`: 表单的最大值。
* `$maximumMessage: string`: 自定义maximum的验证失败提示信息。
* `$integer: boolean`: 必须是整数。当type为integer时，默认验证此项。
* `$integerMessage: string`: 自定义$integer的验证失败提示信息。
* `enum: Array<number>`: 验证表单控件的值必须在此关键字的数组值中。
* `$enumMessage: string`: 自定义enum的验证失败信息。
* `$readOnly: boolean`: 表单控件只读。
* `$placeholder: string`: 表单控件的placeholder属性。
* `$defaultValue: number`: 表单控件的默认值。

  | 值    | 组件名称 |
  | ---   | ---      |
  | radio | 单选框   |

* `$options: Array<{ label: string, value: number }>`: 当$componentType为radio时，可选的选项。

### `type="boolean"`:

组件默认渲染多选框（[Checkbox](https://ant.design/components/checkbox-cn/)）。**配置属性：**

* `$defaultValue: boolean`: 表单控件的默认值。

  | 值     | 组件名称 |
  | ---    | ---      |
  | switch | 开关     |

### `type="array"`:

组件默认渲染表格（[Table](https://ant.design/components/table-cn/)）。点击表格的行数可以修改数据的位置。**配置属性：**

* `items: object`: 数组的内容。
* `$defaultValue: Array<any>`: 表单控件的默认值。
* `minItems: number`: 数组内元素的最小数量。
* `$minItemsMessage: string`: 自定义minItems的验证失败提示信息。
* `maxItems: number`: 数组内元素的最大数量。
* `$maxItemsMessage: string`: 自定义maxItems的验证失败提示信息。
* `$addDataInReverseOrder: boolean`: 设置为`true`时，表格组件添加数据时数据插入到头部。

  | 值            | 组件名称                                               |
  | ---           | ---                                                    |
  | checkboxGroup | 多选框。为了兼容旧版本，“checkbox”也可以渲染成多选框。 |
  | multiple      | 下拉框的多选模式                                       |
  | tags          | 下拉框的多选模式，并且可以输入文字                     |

* `$options: Array<{ label: string, value: string | number }>`: 当$componentType为checkbox、multiple、tags时，可选的选项。