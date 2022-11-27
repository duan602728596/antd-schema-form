import {
  defaultString,
  textArea,
  select,
  radio,
  date,
  password,
  defaultNumber,
  defaultBoolean,
  switchComponent,
  defaultArray,
  checkboxGroup,
  multipleOrTags,
  defaultObject,
  defaultOneOf
} from './components/custom/custom';
import type { CustomComponentObject } from './types';

const customComponent: CustomComponentObject = {
  defaultString,
  textArea,
  select,
  radio,
  date,
  password,
  defaultNumber,
  defaultBoolean,
  switch: switchComponent,
  defaultArray,
  checkboxGroup,
  multiple: multipleOrTags,
  tags: multipleOrTags,
  defaultObject,
  defaultOneOf
};

export default customComponent;