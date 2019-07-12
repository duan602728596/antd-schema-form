import { WrappedFormUtils } from 'antd/lib/form/Form';

export interface ContextValue {
  form: WrappedFormUtils;
  customComponent?: object;
  customTableRender?: object;
  language?: string;
  languagePack?: any;
}

export interface SchemaItem {
  id: string;
  type: string;
  title: string;
  description?: string;
  properties?: object;
  required?: Array<string>;
  dependencies?: {
    [key: string]: Array<string>;
  };
  oneOf?: Array<any>;
  $oneOfIndex?: number;
  $oneOfDisabled?: boolean;
  $hidden?: boolean;
  $tableColumnHidden?: boolean;
  $tableRender?: string;
  $componentType?: string;
  $oneOfComponentType?: string;
}

export interface StringItem extends SchemaItem {
  $readOnly?: boolean;
  $placeholder?: string;
  $required?: boolean;
  $requiredMessage?: string;
  pattern?: string;
  $patternOption?: string;
  $patternMessage?: string;
  minLength?: number;
  maxLength?: number;
  $minLengthMessage?: string;
  $maxLengthMessage?: string;
  $length?: number;
  $lengthMessage?: string;
  enum?: Array<string | number>;
  enumNames?: Array<string>;
  $enumMessage?: string;
  $defaultValue?: string;
}

export interface NumberItem extends SchemaItem {
  $readOnly?: boolean;
  $placeholder?: string;
  $required?: boolean;
  $requiredMessage?: string;
  minimum?: number;
  maximum?: number;
  $minimumMessage?: string;
  $maximumMessage?: string;
  $integer: boolean;
  $integerMessage?: string;
  enum?: Array<string | number>;
  enumNames?: Array<string>;
  $enumMessage?: string;
  $defaultValue?: number;
}

export interface BooleanItem extends SchemaItem {
  $defaultValue?: boolean;
}

export interface ArrayItem extends SchemaItem {
  items: StringItem | NumberItem | BooleanItem | ArrayItem;
  $defaultValue?: Array<any>;
  enum?: Array<string | number>;
  enumNames?: Array<string>;
  minItems?: number;
  maxItems?: number;
  $minItemsMessage?: string;
  $maxItemsMessage?: string;
  $addDataInReverseOrder?: boolean;
}