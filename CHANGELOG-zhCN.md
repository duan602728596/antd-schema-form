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

### v0.4.0-beta.1

* 💀移除了react，react-dom，antd的依赖，改为由用户手动安装。
* 🌟添加自定义组件的功能，[参考](https://github.com/duan602728596/antd-schema-form/blob/master/README-zhCN.md#自定义渲染组件)。