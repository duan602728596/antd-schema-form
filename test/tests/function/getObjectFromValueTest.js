// @flow
import { expect } from 'chai';
import { getObjectFromValue } from '../../SchemaForm';

export function getObjectFromValueTest0(): void{
  const value: Object = {
    $root: {
      col1: 12,
      col2: 'col2',
      col3: [1, 2, 3],
      col4: {
        col1: 'vgy',
        col2: [
          { col1: 13, col2: 'ddx', col3: true },
          { col1: 56.24, col2: 'rki', col3: false }
        ],
        col3: false
      }
    }
  };
  const formFieldValue: Object = {
    '$root/properties/col1': 12,
    '$root/properties/col2': 'col2',
    '$root/properties/col3': [1, 2, 3],
    '$root/properties/col4/properties/col1': 'vgy',
    '$root/properties/col4/properties/col2': [
      { col1: 13, col2: 'ddx', col3: true },
      { col1: 56.24, col2: 'rki', col3: false }
    ],
    '$root/properties/col4/properties/col3': false
  };

  expect(getObjectFromValue(value)).to.be.eql(formFieldValue);
}

export function getObjectFromValueTest1(): void{
  const value: Object = {
    $root: {
      col1: [14, 25, 577.4],
      col2: {
        col1: [1, 2, 3],
        col2: false,
        col3: {
          col1: 'qwerty',
          col2: 78.9283,
          col3: {
            col1: 'ad',
            col2: true
          }
        }
      }
    }
  };
  const formFieldValue: Object = {
    '$root/properties/col1': [14, 25, 577.4],
    '$root/properties/col2/properties/col1': [1, 2, 3],
    '$root/properties/col2/properties/col2': false,
    '$root/properties/col2/properties/col3/properties/col1': 'qwerty',
    '$root/properties/col2/properties/col3/properties/col2': 78.9283,
    '$root/properties/col2/properties/col3/properties/col3/properties/col1': 'ad',
    '$root/properties/col2/properties/col3/properties/col3/properties/col2': true
  };

  expect(getObjectFromValue(value)).to.be.eql(formFieldValue);
}