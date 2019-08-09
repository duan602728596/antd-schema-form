import * as React from 'react';
import { useState, useEffect, forwardRef, PropsWithChildren, Dispatch, SetStateAction, Ref } from 'react';
import SchemaForm, { SchemaFormProps } from './SchemaForm';
import components from './customComponent';
import getKeysFromObject from './utils/getKeysFromObject';
import getObjectFromValue from './utils/getObjectFromValue';
import getValueFromObject from './utils/getValueFromObject';

export default forwardRef(function(props: PropsWithChildren<SchemaFormProps>, ref: Ref<any>): React.ReactElement | null {
  const { customComponent, ...otherProps }: SchemaFormProps = props;
  const [custom, setCustom]: [
    { [key: string]: Function } | undefined,
    Dispatch<SetStateAction<object>>
  ] = useState(Object.assign(components, customComponent || {}));

  useEffect(function(): void {
    setCustom(Object.assign(components, customComponent || {}));
  }, [customComponent]);

  return <SchemaForm ref={ ref } customComponent={ custom } { ...otherProps } />;
});

export {
  getKeysFromObject,
  getObjectFromValue,
  getValueFromObject
};