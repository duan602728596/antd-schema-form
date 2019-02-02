import { expect } from 'chai';
import { getValueFromObject } from '../../SchemaForm';

export function getValueFromObjectTest0(): void{
  const formFieldValue: Object = {
    '$root/properties/col1': 132.9877,
    '$root/properties/col2/properties/col1': 'giosparovkd',
    '$root/properties/col2/properties/col2': [
      { col1: 13, col2: false }
    ],
    '$root/properties/col2/properties/col3': 156.78,
    '$root/properties/col3/properties/col1/properties/col1': 890,
    '$root/properties/col3/properties/col1/properties/col2': 'sdpue',
    '$root/properties/col3/properties/col2/properties/col1': false,
    '$root/properties/col3/properties/col2/properties/col2': [1, 2, 53]
  };
  const value: Object = {
    $root: {
      col1: 132.9877,
      col2: {
        col1: 'giosparovkd',
        col2: [
          { col1: 13, col2: false }
        ],
        col3: 156.78
      },
      col3: {
        col1: {
          col1: 890,
          col2: 'sdpue'
        },
        col2: {
          col1: false,
          col2: [1, 2, 53]
        }
      }
    }
  };

  expect(getValueFromObject(formFieldValue)).to.be.eql(value);
}

export function getValueFromObjectTest1(): void{
  const formFieldValue: Object = {
    '$root/properties/col1': true,
    '$root/properties/col2/properties/col1/properties/col3/properties/col1': 32,
    '$root/properties/col2/properties/col1/properties/col3/properties/col2': 187,
    '$root/properties/col2/properties/col1/properties/col3/properties/col3': 'abd',
    '$root/properties/col2/properties/col1/properties/col3/properties/col4/properties/col1': ['a', '32', 'dpo'],
    '$root/properties/col2/properties/col1/properties/col3/properties/col4/properties/col2': 134.90,
    '$root/properties/col2/properties/col1/properties/col3/properties/col4/properties/col3': false
  };
  const value: Object = {
    $root: {
      col1: true,
      col2: {
        col1: {
          col3: {
            col1: 32,
            col2: 187,
            col3: 'abd',
            col4: {
              col1: ['a', '32', 'dpo'],
              col2: 134.90,
              col3: false
            }
          }
        }
      }
    }
  };

  expect(getValueFromObject(formFieldValue)).to.be.eql(value);
}