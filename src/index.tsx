import { createElement } from 'react';
import {
  useState,
  useEffect,
  forwardRef,
  PropsWithChildren as PWC,
  Dispatch as D,
  SetStateAction as S,
  Ref,
  ReactElement
} from 'react';
import SchemaForm, { SchemaFormProps } from './SchemaForm';
import components from './customComponent';
import getKeysFromObject from './utils/getKeysFromObject';
import getObjectFromValue from './utils/getObjectFromValue';
import getValueFromObject from './utils/getValueFromObject';

export default forwardRef(function(props: PWC<SchemaFormProps>, ref: Ref<any>): ReactElement | null {
  const { customComponent, ...otherProps }: SchemaFormProps = props;
  const [custom, setCustom]: [
    { [key: string]: Function } | undefined,
    D<S<object>>
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