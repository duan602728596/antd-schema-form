### v4.0.1

* 🐛修复`TableComponent`组件在添加时，设置的默认值无效的问题。

### v4.0.0

* 升级所有依赖到最新版本。
* 🐛修复了`TableComponent`组件在添加或编辑后不重新渲染的问题。
* 🐛`TableComponent`组件的添加、编辑功能在取消关闭后重置表单。避免出现编辑后再添加时，表单内遗留编辑数据的问题。
* 🐛移除了`TableComponent`组件的渲染表单验证结果。修复了表单验证结果重复显示的问题。
* 🐛修复了在新版edge下对语言的判断。
* `onCancel`事件参数传递添加了`keys`，用于在执行onCancel事件后可能有重置表单的需求时使用。

### v4.0.0-beta.0

* 🎉升级antd到v4版本。
* 移除了`dependencies`配置，因为antd4的表单无法很好实现v3版本dependencies的效果。
* `description`属性不再通过`Tooltip`显示。

---

### v3.0.1

* 🐛修复`TableComponent`组件确认事件的传参错误。
* 🐛修复多个**$**符号可能导致的格式化表格数据错误。

### v3.0.0

* 🌟允许根据需要加载想要的组件，[参考](docs/load_components_as_needed-zhCN.md)。
* 💀type为array类型时的**checkbox**组件更名为**checkboxGroup**（避免按需加载时的命名冲突），不过目前还是会兼容旧的组件名称。
* 重新梳理了文档。

### v2.5.0-rc.1

* 🐛boolean类型组件应该使用`valuePropName: 'checked'`代替`state`控制显示。

### v2.5.0-rc.0

* 🌟使用*React Hooks*重构代码。
* 💀移除`Input.Password`兼容组件。

### v2.4.1

* 🐛boolean类型组件应该使用`valuePropName: 'checked'`代替`state`控制显示。

### v2.4.0

* 💀🌟表单验证信息添加到国际化支持，且支持模板占位符。
* 🐛修复了部分类型的错误。

### v2.3.1

* 编译`d.ts`文件。

### v2.3.0

* 🌟添加object类型的自定义组件渲染。
* 🌟添加oneOf的自定义组件渲染。

### v2.2.0

* 🌟添加dependencies的表单渲染效果，[参考](https://github.com/duan602728596/antd-schema-form/blob/master/README-zhCN.md#typeobject)。[#3](https://github.com/duan602728596/antd-schema-form/issues/3)

### v2.1.0

* 🌟添加自定义表格列渲染组件，[参考](https://github.com/duan602728596/antd-schema-form/blob/master/README-zhCN.md#自定义表格列渲染组件)。

### v2.0.2

* 🐛修复table组件添加和修改时文案不对应的问题。

### v2.0.1

* 🐛修复number组件的最大值和最小值在组件没有值时仍然验证的问题。

### v2.0.0

* 🎉组件发布版本2.0.0。
* 🐛修复了表格组件的拖拽问题。
* 🌟允许表单域隐藏（表单值仍然存在）。
* 🌟允许表格组件的列隐藏（表单值仍然存在）。
* 🌟表格组件添加数据时的面板按钮文本改为“添加”和“关闭”。

### v2.0.0-beta.13

* 🐛修复了string的select组件在required（不是$required）的情况下清除按钮仍然存在的问题。

### v2.0.0-beta.12

* 🐛使用原生的拖拽替换dnd组件的拖拽，避免出现其他组件使用dnd组件导致的`Cannot have two HTML5 backends at the same time`错误。

### v2.0.0-beta.10

* 🌟OneOf添加`$oneOfDisabled`字段，可以禁止切换Radio.Group的值。

### v2.0.0-beta.9

* 🐛解决可能获取不到oneOf内id的情况。
* 调整样式：折叠面板和RadioGroup之间的距离。

### v2.0.0-beta.7

* 🌟数组类型添加`$addDataInReverseOrder`字段，允许表格组件添加数据时数据插入到头部。

### v2.0.0-beta.6

* 🐛修复因为ts和js对json文件的引入的处理方式不同导致的错误。

### v2.0.0-beta.5

* 🐛将`.babelrc`添加到`.npmignore`名单中，解决误上传`.babelrc`文件导致的编译错误提示。

### v2.0.0-beta.4

* 🌟array类型添加数组内元素数量的验证。
* 🌟`TableComponent`组件添加错误验证。
* 微调了`FormObject`的样式。

### v2.0.0-beta.3

* 🌟`TableComponent`组件添加拖拽排序功能。

### v2.0.0-beta.2

* 🐛添加被误删除的样式。

### v2.0.0-beta.1

* 💀使用**typescript**重构代码。

---

### v1.2.0

* 💀移除了文件上传组件**upload**，文件上传请使用自定义组件实现。

### v1.1.0

* 🌟数组添加了新的渲染组件：**tags**。
* 🌟修改了OneOf的效果，现在OneOf使用`Radio.Group`来切换不同的状态。

### v1.0.2

* 🐛修复一处拼写错误，Table组件的序号现在居中。

### v1.0.1

* 🌟Table组件添加了多选框和删除选中数据的功能。

### v1.0.0

* 🎉组件发布正式版。
* 🌟组件添加了国际化支持。

---

### v0.4.0-beta.1

* 💀移除了react，react-dom，antd的依赖，改为由用户手动安装。
* 🌟添加自定义组件的功能，[参考](https://github.com/duan602728596/antd-schema-form/blob/master/README-zhCN.md#自定义渲染组件)。