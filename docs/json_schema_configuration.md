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
* `$order: number`: Define the order in which components are arranged. The smaller the value, the higher the arrangement. When this property is not configured, the default is 0.
* `oneOf: Array<object>`: Multiple types of keywords possible.
* `$oneOfComponentType: string`: Rendered as other component when there has an *oneOf* attribute, at this point, the `$componentType` attribute only takes effect for the schema configuration in `oneOf`. The component returned by the function [reference](https://github.com/duan602728596/antd-schema-form/blob/master/src/components/FormObject/OneOf.tsx)。
* `$oneOfIndex: number`: The index of the selected Radio.Group under *oneOf*.
* `$oneOfDisabled: boolean`: *OneOf* is disabled under Radio.Group.
* `$hidden: boolean`: Hide form fields (form values still exist).
* `$disabled: boolean`: Disable components.
* `$formItemProps: object`: Configure `Form.Item` props.
* `$tableColumnHidden: boolean`: When the object is an object in the array and the component is a table, the column is hidden (the form value still exists).
* `$tableRender: string`: Rendering to other custom table column rendering components.

### `type="object"`:

The component renders the collapsed panel by default ([Collapse](https://ant.design/components/collapse-cn/)). **Configuration properties:**

* `properties: object`: When **type** is **object**, the attributes below the object are listed.
* `required: Array<string>`: The attributes that the object must contain. Unlike the `$required` attribute.

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

  | Value    | Component Name                                                                                                                                |
  | ---      | ---                                                                                                                                           |
  | textArea | Text field.                                                                                                                                   |
  | select   | Drop-down box.                                                                                                                                |
  | radio    | Radio box.                                                                                                                                    |
  | date     | Date picker. (**When the component is a date picker, the value is a Moment object, and you need to process the value of the date yourself.**) |
  | password | Password box.                                                                                                                                 |

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
  | ---   | ---            |
  | radio | Radio box.     |

* `$options: Array<{ label: string, value: number }>`: Optional option when $componentType is radio.

### `type="boolean"`:

The component renders a checkbox by default ([Checkbox](https://ant.design/components/checkbox/)). **Configuration properties:**

* `$defaultValue: boolean`: The default value of the form control.

  | Value  | Component Name |
  | ---    | ---            |
  | switch | Switch.        |

### `type="array"`:

The component renders the table by default ([Table](https://ant.design/components/table/)).Click on the number of rows in the table to modify the location of the data. **Configuration properties:**

* `items: object`: the contents of the array.
* `$defaultValue: Array<any>`: The default value of the form control.
* `minItems: number`: the minimum value of the form.
* `$minItemsMessage: string`: Customize the verification failure message for the minItems.
* `maxItems: number`: the maximum value of the form.
* `$maxItemsMessage: string`: Customize the verification failure message for maxItems.
* `$addDataInReverseOrder: boolean`: When set to `true`, data is inserted into the header when the table component adds data.

  | Value    | Component Name                                                                                                       |
  | ---      | ---                                                                                                                  |
  | checkbox | Multiple checkbox. For compatibility with older versions, the "checkbox" can also be rendered as a multi-select box. |
  | multiple | Drop-down box multiple selection mode.                                                                               |
  | tags     | Multi-select mode for drop-down box, and you can enter text.                                                         |

* `$options: Array<{ label: string, value: string | number }>`: Optional when $componentType is checkbox, multiple, tags.