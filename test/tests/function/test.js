import { expect } from 'chai';
import { getKeysFromObjectTest0, getKeysFromObjectTest1, getKeysFromObjectTestOneOf } from './getKeysFromObjectTest';
import { getObjectFromValueTest0, getObjectFromValueTest1 } from './getObjectFromValueTest';
import { getValueFromObjectTest0, getValueFromObjectTest1 } from './getValueFromObjectTest';
import { template } from '../../SchemaForm';

// 通用函数测试
describe('general function test', function() {
  // 根据schema.json获取一个keys的数组
  describe('getKeysFromObject: Get an array of keys according to schema.json', function() {
    it('should return an array of keys', getKeysFromObjectTest0);
    it('should return an array of keys', getKeysFromObjectTest1);
    it('should return an array of keys oneOfWhen there is oneOf in the schema', getKeysFromObjectTestOneOf);
  });

  // 根据一个值，转换成表单所需要的object
  describe('getObjectFromValue: The object required to convert to a form based on a value', function() {
    it('should return the object required for a form', getObjectFromValueTest0);
    it('should return the object required for a form', getObjectFromValueTest1);
  });

  // 根据表单值，转换成格式化后的值
  describe('getValueFromObjectTest: Convert to formatted values based on form values', function() {
    it('should return a formatted value', getValueFromObjectTest0);
    it('should return a formatted value', getValueFromObjectTest1);
  });

  // 测试模板函数
  describe('template: Return the correct string', function() {
    it('should return string', function() {
      expect(template('{0} { result }.', {
        '0': 12,
        result: 'next'
      })).to.be.eql('12 next.');
    });

    it('should return string', function() {
      expect(template('{0} + {1} = {2}', {
        '0': 22,
        '1': 11,
        '2': 33
      })).to.be.eql('22 + 11 = 33');
    });
  });
});