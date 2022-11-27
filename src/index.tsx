import {
  createElement,
  useState,
  useEffect,
  forwardRef,
  PropsWithChildren,
  Dispatch as D,
  SetStateAction as S,
  ForwardedRef,
  ReactElement
} from 'react';
import SchemaForm, { SchemaFormProps } from './SchemaForm';
import components from './customComponent';
import getKeysFromObject from './utils/getKeysFromObject';
import getObjectFromValue from './utils/getObjectFromValue';
import getValueFromObject from './utils/getValueFromObject';
import type { CustomComponentObject } from './types';

export default forwardRef(function(props: PropsWithChildren<SchemaFormProps>, ref: ForwardedRef<any>): ReactElement | null {
  const { customComponent, ...otherProps }: SchemaFormProps = props;
  const [custom, setCustom]: [
    CustomComponentObject | undefined,
    D<S<CustomComponentObject | undefined>>
  ] = useState(Object.assign(components, customComponent ?? {}));

  useEffect(function(): void {
    setCustom(Object.assign(components, customComponent ?? {}));
  }, [customComponent]);

  return <SchemaForm ref={ ref } customComponent={ custom } { ...otherProps } />;
});

export {
  getKeysFromObject,
  getObjectFromValue,
  getValueFromObject
};