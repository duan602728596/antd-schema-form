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
  defaultOneOf
} from './components/custom/custom';

const customComponent: object = {
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
  defaultOneOf
};

export default customComponent;