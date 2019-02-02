import { expect } from 'chai';
import { getKeysFromObject } from '../../SchemaForm';

export function getKeysFromObjectTest0(): void{
  const json: Object = {
    id: '$root',
    type: 'object',
    title: '$root',
    properties: {
      col1: {
        id: '$root/properties/col1',
        type: 'string',
        title: 'col1'
      },
      col2: {
        id: '$root/properties/col2',
        type: 'object',
        title: 'col2',
        properties: {
          col1: {
            id: '$root/properties/col2/properties/col1',
            type: 'array',
            title: 'col1',
            items: {
              id: '$root/properties/col2/properties/col1/items',
              type: 'object',
              title: 'items',
              properties: {
                col3: {
                  id: '$root/properties/col2/properties/col1/items/properties/col3',
                  type: 'string',
                  title: 'col3'
                }
              }
            }
          },
          col2: {
            id: '$root/properties/col2/properties/col2',
            type: 'boolean',
            title: 'col12'
          }
        }
      }
    }
  };

  expect(getKeysFromObject(json)).to.be.eql([
    '$root/properties/col1',
    '$root/properties/col2/properties/col1',
    '$root/properties/col2/properties/col2'
  ]);
}

export function getKeysFromObjectTest1(): void{
  const json: Object = {
    id: '$root',
    type: 'object',
    title: '$root',
    properties: {
      col1: {
        id: '$root/properties/col1',
        type: 'array',
        title: 'col1',
        items: {
          id: '$root/properties/col1/items',
          type: 'object',
          title: 'items',
          properties: {
            col1: {
              id: '$root/properties/col1/item1/properties/col1',
              type: 'string',
              title: 'col1'
            },
            col2: {
              id: '$root/properties/col1/item1/properties/col2',
              type: 'number',
              title: 'col2'
            },
            col3: {
              id: '$root/properties/col1/item1/properties/col3',
              type: 'boolean',
              title: 'col3'
            }
          }
        }
      }
    }
  };

  expect(getKeysFromObject(json.properties.col1.items)).to.be.eql([
    '$root/properties/col1/item1/properties/col1',
    '$root/properties/col1/item1/properties/col2',
    '$root/properties/col1/item1/properties/col3'
  ]);
}