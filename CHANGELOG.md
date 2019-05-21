### v2.3.1

* Compile the ' d.ts ' file.

### v2.3.0

* 🌟Add a custom component rendering of the object type.
* 🌟Add oneOf's custom component rendering.

### v2.2.0

* 🌟Add dependencies to the form rendering effect, [reference](https://github.com/duan602728596/antd-schema-form#typeobject). [#3](https://github.com/duan602728596/antd-schema-form/issues/3)

### v2.1.0

* 🌟Add a custom table column render component, [reference](https://github.com/duan602728596/antd-schema-form/blob/master/README.md#custom-table-column-rendering-component).

### v2.0.2

* 🐛Fix the problem that the copy of the table component does not correspond when adding and modifying.

### v2.0.1

* 🐛Fix the problem that the maximum and minimum values of the number component are still valid when the component has no value.

### v2.0.0

* 🎉Component release version 2.0.0.
* 🐛Fixed drag and drop of table component.
* 🌟Allow form fields to be hidden (form values still exist).
* 🌟Allow columns of table components to be hidden (form values still exist).
* 🌟The panel button text when the table component adds data is changed to "Add" and "Close".

### v2.0.0-beta.13

* 🐛Fixed an issue where the select component of string would still have a clear button in the case of required (not $required).

### v2.0.0-beta.12

* 🐛Use the native drag and drop to replace the drag of the dnd component to avoid the `Cannot have two HTML5 backends at the same time` error caused by other components using the dnd component.

### v2.0.0-beta.10

* 🌟OneOf adds the `$oneOfDisabled` field to disable the switch to the value of Radio.Group.

### v2.0.0-beta.9

* 🐛Solve the situation where the id of oneOf may not be obtained.
* Adjust the style: the distance between the fold panel and the RadioGroup.

### v2.0.0-beta.7

* 🌟The array type adds the `$addDataInReverseOrder` field, which allows data to be inserted into the header when the table component adds data.

### v2.0.0-beta.6

* 🐛Fix the error caused by the different handling of the introduction of json files by ts and js.

### v2.0.0-beta.5

* 🐛Add `.babelrc` to the `.npmignore` list to resolve compilation errors caused by incorrectly uploading `.babelrc` files.

### v2.0.0-beta.4

* 🌟array type adds validation of the number of elements in the array.
* 🌟Add error validation to the `TableComponent` component.
* Fine-tuned the style of `FormObject`.

### v2.0.0-beta.3

* 🌟The `TableComponent` component adds a drag-and-drop sort feature.

### v2.0.0-beta.2

* 🐛Add a style that was accidentally deleted.

### v2.0.0-beta.1

* 💀Refactor the code using **typescript**.

---

### v1.2.0

* 💀The file upload component **upload** has been removed, and the file upload is implemented using a custom component.

### v1.1.0

* 🌟The array adds a new rendering component: **tags**.
* 🌟Modified the effect of OneOf, now OneOf uses `Radio.Group` to switch between different states.

### v1.0.2

* 🐛Fix a spelling mistake, the serial number of the Table component is now centered.

### v1.0.1

* 🌟The Table component adds a multi-select box and removes the selected data.

### v1.0.0

* 🎉The component is released in the official version.
* 🌟The component has added international support.

---

### v0.4.0-beta.1

* 💀The dependencies of react, react-dom, and ant are removed and manually installed by the user.
* 🌟Add custom component features, [reference](https://github.com/duan602728596/antd-schema-form/blob/master/README.md#custom-rendering-component).