import describe from 'describe';
import it from 'it';
import { getKeysFromObjectTest0, getKeysFromObjectTest1 } from './getKeysFromObjectTest';
import { getObjectFromValueTest0, getObjectFromValueTest1 } from './getObjectFromValueTest';
import { getValueFromObjectTest0, getValueFromObjectTest1 } from './getValueFromObjectTest';

describe('通用函数测试', function() {
  describe('getKeysFromObject：根据schema.json获取一个keys的数组', function() {
    it('测试0', getKeysFromObjectTest0);
    it('测试1', getKeysFromObjectTest1);
  });

  describe('getObjectFromValue：根据一个值，转换成表单所需要的object', function() {
    it('测试0', getObjectFromValueTest0);
    it('测试1', getObjectFromValueTest1);
  });

  describe('getValueFromObjectTest：根据表单值，转换成格式化后的值', function() {
    it('测试0', getValueFromObjectTest0);
    it('测试1', getValueFromObjectTest1);
  });
});