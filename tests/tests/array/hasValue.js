import { expect } from 'chai';
import { mount } from 'enzyme';
import React from 'react';
import SchemaForm from '../../SchemaForm';

/* 组件有默认值 */
export function componentHasDefaultValue() {
  const json = {
    id: '$root',
    type: 'array',
    title: '组件有默认值',
    items: {
      id: '$root/items',
      type: 'object',
      title: '数组内的对象',
      properties: {
        col1: {
          id: '$root/items/properties/col1',
          type: 'string',
          title: 'col1'
        },
        col2: {
          id: '$root/items/properties/col2',
          type: 'number',
          title: 'col2'
        }
      }
    },
    $defaultValue: [
      { col1: 'ddd', col2: 1 },
      { col1: 'zmh', col2: 16 },
      { col1: 'tsl', col2: 32 }
    ]
  };
  const wrapper = mount(<SchemaForm json={ json } />);
  const tBody = wrapper.find('tbody');
  const tr = tBody.find('tr');
  const tr0td = tr.at(0).find('td');
  const tr1td = tr.at(1).find('td');
  const tr2td = tr.at(2).find('td');

  expect(tr0td.at(2).text()).to.be.equal('ddd');
  expect(Number(tr0td.at(3).text())).to.be.equal(1);
  expect(tr1td.at(2).text()).to.be.equal('zmh');
  expect(Number(tr1td.at(3).text())).to.be.equal(16);
  expect(tr2td.at(2).text()).to.be.equal('tsl');
  expect(Number(tr2td.at(3).text())).to.be.equal(32);
}

/* 组件有值 */
export function componentHasValue() {
  const json = {
    id: '$root',
    type: 'array',
    title: '组件有值',
    items: {
      id: '$root/items',
      type: 'object',
      title: '数组内的对象',
      properties: {
        col1: {
          id: '$root/items/properties/col1',
          type: 'string',
          title: 'col1'
        },
        col2: {
          id: '$root/items/properties/col2',
          type: 'number',
          title: 'col2'
        },
        col3: {
          id: '$root/items/properties/col3',
          type: 'boolean',
          title: 'col3'
        }
      }
    }
  };
  const value = {
    $root: [
      { col1: 'lsn', col2: 42, col3: true },
      { col1: 'lx', col2: 167, col3: false },
      { col1: 'xsy', col2: 32.57, col3: true }
    ]
  };
  const wrapper = mount(<SchemaForm json={ json } value={ value } />);
  const tBody = wrapper.find('tbody');
  const tr = tBody.find('tr');
  const tr0td = tr.at(0).find('td');
  const tr1td = tr.at(1).find('td');
  const tr2td = tr.at(2).find('td');

  expect(tr0td.at(2).text()).to.be.equal('lsn');
  expect(Number(tr0td.at(3).text())).to.be.equal(42);
  expect(tr0td.at(4).text()).to.be.equal(String(true));
  expect(tr1td.at(2).text()).to.be.equal('lx');
  expect(Number(tr1td.at(3).text())).to.be.equal(167);
  expect(tr1td.at(4).text()).to.be.equal(String(false));
  expect(tr2td.at(2).text()).to.be.equal('xsy');
  expect(Number(tr2td.at(3).text())).to.be.equal(32.57);
  expect(tr2td.at(4).text()).to.be.equal(String(true));
}

/* 数组内为字符串或数字 */
export function componentItemsIsStringOrNumber() {
  const json = {
    id: '$root',
    type: 'array',
    title: '数组内为字符串或数字',
    items: {
      id: '$root/items',
      type: 'string',
      title: '数组内的字符串或数字'
    }
  };
  const value = {
    $root: ['a', 'b', 'c', 'd']
  };
  const wrapper = mount(<SchemaForm json={ json } value={ value } />);
  const tBody = wrapper.find('tbody');
  const tr = tBody.find('tr');
  const tr0td = tr.at(0).find('td');
  const tr1td = tr.at(1).find('td');
  const tr2td = tr.at(2).find('td');
  const tr3td = tr.at(3).find('td');

  expect(tr0td.at(2).text()).to.be.equal('a');
  expect(tr1td.at(2).text()).to.be.equal('b');
  expect(tr2td.at(2).text()).to.be.equal('c');
  expect(tr3td.at(2).text()).to.be.equal('d');
}

/* 多选框有默认值 */
export function CheckboxGroupHastDefaultValue() {
  const json = {
    id: '$root',
    type: 'array',
    title: '多选框有值',
    items: {
      id: '$root/items',
      type: 'string',
      title: '值'
    },
    $componentType: 'checkbox',
    $options: [
      { label: '选项1', value: '值1' },
      { label: '选项2', value: '值2' },
      { label: '选项3', value: '值3' }
    ],
    $defaultValue: ['值1', '值3']
  };
  const wrapper = mount(<SchemaForm json={ json } />);
  const antCheckboxChecked = wrapper.find('.ant-checkbox-input');

  expect(antCheckboxChecked.at(0).getDOMNode().checked).to.be.true;
  expect(antCheckboxChecked.at(1).getDOMNode().checked).to.be.false;
  expect(antCheckboxChecked.at(2).getDOMNode().checked).to.be.true;
}

/* 多选框有值 */
export function CheckboxGroupHastValue() {
  const json = {
    id: '$root',
    type: 'array',
    title: '多选框有值',
    items: {
      id: '$root/items',
      type: 'string',
      title: '值'
    },
    $componentType: 'checkboxGroup',
    $options: [
      { label: '选项1', value: '值1' },
      { label: '选项2', value: '值2' },
      { label: '选项3', value: '值3' }
    ]
  };
  const value = {
    $root: ['值2']
  };
  const wrapper = mount(<SchemaForm json={ json } value={ value } />);
  const antCheckboxChecked = wrapper.find('.ant-checkbox-input');

  expect(antCheckboxChecked.at(0).getDOMNode().checked).to.be.false;
  expect(antCheckboxChecked.at(1).getDOMNode().checked).to.be.true;
  expect(antCheckboxChecked.at(2).getDOMNode().checked).to.be.false;
}