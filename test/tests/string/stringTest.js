import describe from 'describe';
import it from 'it';
import React from 'react';
import { renderDefault, renderTextArea, renderSelect, renderRadio, renderDate, renderFileUpload } from './componentRendering';
import {
  componentHasDefaultValue, componentHastValue, selectHasDefaultValue, selectHasValue, radioHasDefaultValue,
  radioHastValue, dateHasDefaultValue, dateHasValue, theValueOfTheComponentOverridesTheDefaultValue
} from './hasValue';
import { componentReadOnly, componentPlaceholder, selectComponentPlaceholder } from './attrs';

/* 字符串组件测试用例 */
describe('字符串组件测试用例', function(): void{
  /* 组件渲染 */
  describe('组件渲染', function(): void{
    it('渲染默认组件', renderDefault);
    it('渲染文本域', renderTextArea);
    it('渲染下拉框', renderSelect);
    it('渲染单选组件', renderRadio);
    it('渲染日期组件', renderDate);
    it('渲染文件上传组件', renderFileUpload);
  });

  /* 交互测试 */
  describe('交互测试', function(): void{
    describe('有值', function(): void{
      it('组件有默认值', componentHasDefaultValue);
      it('组件有值', componentHastValue);
      it('下拉框有默认值', selectHasDefaultValue);
      it('下拉框有值', selectHasValue);
      it('单选框有默认值', radioHasDefaultValue);
      it('单选框有值', radioHastValue);
      it('日期选择器有默认值', dateHasDefaultValue);
      it('日期选择器有值', dateHasValue);
      it('组件的值会覆盖默认值', theValueOfTheComponentOverridesTheDefaultValue);
    });

    describe('组件的属性', function(): void{
      it('组件只读', componentReadOnly);
      it('组件的placeholder属性', componentPlaceholder);
      it('select组件的placeholder属性', selectComponentPlaceholder);
    });
  });
});