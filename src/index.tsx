import * as React from 'react';
import { useState, useEffect, PropsWithChildren, Dispatch, SetStateAction } from 'react';
import SchemaForm, { SchemaFormProps } from './SchemaForm';
import components from './customComponent';
import getKeysFromObject from './utils/getKeysFromObject';
import getObjectFromValue from './utils/getObjectFromValue';
import getValueFromObject from './utils/getValueFromObject';

export default function(props: PropsWithChildren<SchemaFormProps>): React.ReactNode | null {
  const { customComponent, ...otherProps }: SchemaFormProps = props;
  const [custom, setCustom]: [
    object | undefined,
    Dispatch<SetStateAction<object>>
  ] = useState(Object.assign(components, customComponent || {}));

  useEffect(function(): void {
    setCustom(Object.assign(components, customComponent || {}));
  }, [customComponent]);

  return <SchemaForm customComponent={ custom } { ...otherProps } />;
}

export {
  getKeysFromObject,
  getObjectFromValue,
  getValueFromObject
};