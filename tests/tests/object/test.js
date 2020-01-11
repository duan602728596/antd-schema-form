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
});