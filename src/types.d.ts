import type { FormInstance } from 'antd/es/form';

export interface ContextValue {
  form: FormInstance;
  customComponent?: Record<string, Function>;
  customTableRender?: Record<string, Function>;
  language?: string;
  languagePack?: any;
  json: SchemaItem;
  schemaFormValue: any;
}

export interface SchemaItem {
  id: string;
  type: string;
  title: string;
  description?: string;
  properties?: object;
  required?: Array<string>;
  oneOf?: Array<any>;
  $oneOfIndex?: number;
  $oneOfDisabled?: boolean;
  $hidden?: boolean;
  $tableColumnHidden?: boolean;
  $tableRender?: string;
  $componentType?: string;
  $oneOfComponentType?: string;
  $order?: number;
  $formItemProps?: Record<string, any>;
  $disabled?: boolean;
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
  enum?: Array<string>;
  $enumMessage?: string;
  $defaultValue?: string;
  $showTime?: boolean;
  $format?: string;
  $options?: Array<{ label: string; value: string }>;
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
  $integer?: boolean;
  $integerMessage?: string;
  enum?: Array<string>;
  $enumMessage?: string;
  $defaultValue?: number;
  $options?: Array<{ label: string; value: number }>;
}

export interface BooleanItem extends SchemaItem {
  $defaultValue?: boolean;
}

export interface ArrayItem extends SchemaItem {
  items: SchemaItem | StringItem | NumberItem | BooleanItem | ArrayItem;
  $defaultValue?: Array<any>;
  $options?: Array<{ label: string; value: any }>;
  $required?: boolean;
  $requiredMessage?: string;
  minItems?: number;
  maxItems?: number;
  $minItemsMessage?: string;
  $maxItemsMessage?: string;
  $addDataInReverseOrder?: boolean;
  $rowKey?: string;
}