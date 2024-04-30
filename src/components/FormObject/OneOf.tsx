import {
  createElement,
  Fragment,
  useState,
  useEffect,
  useContext,
  PropsWithChildren,
  Dispatch as D,
  SetStateAction as S,
  ReactElement,
  ReactNode
} from 'react';
import { Radio } from 'antd';
import type { RadioChangeEvent } from 'antd/es/radio';
import { isNumber } from '../../utils/lodash';
import AntdSchemaFormContext from '../../context';
import styleName from '../../utils/styleName';
import type { SchemaItem, ContextValue } from '../../types';

interface OneOfProps {
  root: SchemaItem;
  element: Array<ReactNode>;
}

function OneOf(props: PropsWithChildren<OneOfProps>): ReactElement {
  const context: ContextValue = useContext(AntdSchemaFormContext);
  const { form }: ContextValue = context;
  const { element, root }: OneOfProps = props;
  const { id, oneOf, $oneOfDisabled, $oneOfIndex }: SchemaItem = root;

  // oneOf选项卡的index
  const [index, setIndex]: [number, D<S<number>>]
    = useState(($oneOfIndex !== undefined && isNumber($oneOfIndex)) ? $oneOfIndex : 0);

  // 切换的callback
  function switchCallback(newIndex: number, oldIndex: number): void {
    // 这个情况是type="string"时，下一个控件是date，因为moment的关系，所以要清空组件的值，最好尽量避免这种情况
    // This case is type="string", the next control is date, because of the relationship of the moment,
    // so to clear the value of the component, it is best to avoid this situation
    if (
      oneOf
      && oneOf[newIndex].type === 'string' && oneOf[oldIndex].type === 'string'                    // 新旧组件都为string
      && ((oneOf[oldIndex].$componentType !== 'date' && oneOf[newIndex].$componentType === 'date') // 判断是否为date组件
      || (oneOf[oldIndex].$componentType === 'date' && oneOf[newIndex].$componentType !== 'date'))
    ) {
      form.resetFields([id]);
    }

    setIndex(newIndex);
  }

  // 切换指定index
  function handleDesignationIndexChange(event: RadioChangeEvent): void {
    const value: unknown = event.target.value;

    if (typeof value === 'number') {
      switchCallback(value, index);
    }
  }

  useEffect(function(): void {
    setIndex(($oneOfIndex !== undefined && isNumber($oneOfIndex)) ? $oneOfIndex : 0);
  }, [root]);

  // 渲染radio
  function radioGroupView(): ReactNode {
    const options: { label: string; value: number }[] = [];
    const of: Array<SchemaItem> = oneOf || [];

    for (let i: number = 0, j: number = of.length; i < j; i++) {
      const item: SchemaItem = of[i];

      options.push({ label: item.title, value: i });
    }

    return (
      <Radio.Group key="radio-group"
        size="small"
        options={ options }
        value={ index }
        onChange={ $oneOfDisabled ? undefined : handleDesignationIndexChange }
      />
    );
  }

  return (
    <Fragment>
      <div className={ styleName('object-radio-group') }>
        { radioGroupView() }
      </div>
      { element[index] }
    </Fragment>
  );
}

export default OneOf;