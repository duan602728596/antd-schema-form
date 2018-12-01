import describe from 'describe';
import React from 'react';
import {
  renderDefaultComponent, renderTextArea, renderSelect, renderRadio, renderDateComponent,
  renderFileUploadComponent
} from './componentRendering';

/* 字符串组件测试用例 */
describe('字符串组件测试用例', function(): void{
  /* 组件渲染 */
  describe('组件渲染', function(): void{
    it('渲染默认组件', renderDefaultComponent);
    it('渲染文本域', renderTextArea);
    it('渲染下拉框', renderSelect);
    it('渲染单选组件', renderRadio);
    it('渲染日期组件', renderDateComponent);
    it('渲染文件上传组件', renderFileUploadComponent);
  });
});