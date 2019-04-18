import describe from 'describe';
import it from 'it';
import { expect } from 'chai';
import { mount } from 'enzyme';
import React from 'react';
import SchemaForm from '../../SchemaForm';
import { sleep } from '../utils';

/* 对象组件的测试用例 */
describe('component rendering', function() {
  // 组件渲染
  describe('component rendering', function() {
    // 组件渲染
    it('should render component', function() {
      const json = {
        id: '$root',
        type: 'object',
        title: '渲染组件',
        properties: {
          name: {
            id: '$root/properties/name',
            type: 'string',
            title: 'name'
          },
          age: {
            id: '$root/properties/age',
            type: 'number',
            title: 'age'
          },
          etc: {
            id: '$root/properties/etc',
            type: 'object',
            title: 'etc',
            properties: {
              school: {
                id: '$root/properties/etc/properties/school',
                type: 'string',
                title: 'school'
              },
              city: {
                id: '$root/properties/etc/properties/city',
                type: 'string',
                title: 'city'
              },
              isMarried: {
                id: '$root/properties/etc/properties/isMarried',
                type: 'boolean',
                title: 'isMarried'
              }
            }
          }
        }
      };

      const wrapper = mount(<SchemaForm json={ json } />);
      const antInput = wrapper.find('.ant-input');
      const antInputNumber = wrapper.find('.ant-input-number');
      const antCheckboxInput = wrapper.find('.ant-checkbox-input');

      expect(antInput).to.have.lengthOf(3);
      expect(antInputNumber).to.have.lengthOf(1);
      expect(antCheckboxInput).to.have.lengthOf(1);
    });
  });

  /* oneOf渲染 */
  describe('oneOf component rendering', function() {
    // oneOf
    it('should oneOf component rendering', function() {
      const json = {
        id: '$root',
        title: 'oneOf',
        oneOf: [
          {
            type: 'string'
          },
          {
            type: 'number'
          },
          {
            type: 'boolean'
          }
        ]
      };

      const wrapper = mount(<SchemaForm json={ json } />);
      const antRadioInput = wrapper.find('.ant-radio-input');

      expect(antRadioInput).to.have.lengthOf(3);
    });
  });

  /* dependencies渲染 */
  describe('dependencies component rendering', function() {
    // dependencies
    it('should dependencies component rendering', function() {
      const json = {
        id: '$root',
        type: 'object',
        title: 'dependencies',
        properties: {
          name: {
            id: '$root/properties/name',
            type: 'string'
          },
          age: {
            id: '$root/properties/age',
            type: 'number'
          },
          school: {
            id: '$root/properties/school',
            type: 'string'
          }
        },
        dependencies: {
          name: ['age', 'school']
        }
      };

      const wrapper = mount(<SchemaForm json={ json } />);

      expect(wrapper.find('.ant-input')).to.have.lengthOf(1);
      expect(wrapper.find('.ant-input-number-input')).to.have.lengthOf(0);

      // 模拟输入
      wrapper.find('.ant-input').at(0).simulate('change', {
        target: {
          value: 'hahaha'
        }
      });

      expect(wrapper.find('.ant-input')).to.have.lengthOf(2);
      expect(wrapper.find('.ant-input-number-input')).to.have.lengthOf(1);
    });
  });
});