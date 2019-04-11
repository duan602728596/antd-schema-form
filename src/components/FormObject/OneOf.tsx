import * as React from 'react';
import { Component, Context } from 'react';
import * as PropTypes from 'prop-types';
import { Requireable, ReactNodeLike } from 'prop-types';
import isNumber from 'lodash-es/isNumber';
import { Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import AntdSchemaFormContext from '../../context';
import { SchemaItem, ContextValue } from '../../types';

interface OneOfProps {
  root: SchemaItem;
  element: React.ReactNodeArray;
}

interface OneOfState {
  root: SchemaItem;
  index: number;
}

class OneOf extends Component<OneOfProps, OneOfState> {
  static contextType: Context<ContextValue | {}> = AntdSchemaFormContext;
  static propTypes: {
    root: Requireable<object>;
    element: Requireable<ReactNodeLike>;
  } = {
    root: PropTypes.object,
    element: PropTypes.arrayOf(PropTypes.node)
  };

  context: ContextValue;

  constructor(props: OneOfProps, ...argu: Array<any>) {
    super(props, ...argu);

    const { root }: OneOfProps = this.props;

    this.state = {
      root,
      index: (root.$oneOfIndex !== undefined && isNumber(root.$oneOfIndex)) ? root.$oneOfIndex : 0 // oneOf选项卡的index
    };
  }

  static getDerivedStateFromProps(nextProps: OneOfProps, prevState: OneOfState): { index: number } | null {
    if (nextProps.root !== prevState.root) {
      const { root }: OneOfProps = nextProps;

      return {
        index: (root.$oneOfIndex !== undefined && isNumber(root.$oneOfIndex)) ? root.$oneOfIndex : 0
      };
    }

    return null;
  }

  // 切换指定index
  handleDesignationIndexChange(event: RadioChangeEvent): void {
    const index: number = this.state.index;

    this.switchCallback(event.target.value, index);
  }

  // 切换的callback
  switchCallback(newIndex: number, oldIndex: number): void {
    const { root }: OneOfProps = this.props;
    const { form }: ContextValue = this.context;
    const { oneOf }: SchemaItem = root;

    // 这个情况是type="string"时，下一个控件是date，因为moment的关系，所以要清空组件的值，最好尽量避免这种情况
    if (
      oneOf
      && oneOf[newIndex].type === 'string' && oneOf[oldIndex].type === 'string' // 新旧组件都为string
      && ((oneOf[oldIndex].$componentType !== 'date' && oneOf[newIndex].$componentType === 'date') // 判断是否为date组件
      || (oneOf[oldIndex].$componentType === 'date' && oneOf[newIndex].$componentType !== 'date'))
    ) {
      form.resetFields([root.id]);
    }

    this.setState({ index: newIndex });
  }

  // 渲染radio
  radioGroupView(root: SchemaItem, index: number): React.ReactNode {
    const options: { label: string; value: number }[] = [];
    const oneOf: Array<SchemaItem> = root.oneOf || [];

    for (let i: number = 0, j: number = oneOf.length; i < j; i++) {
      const item: SchemaItem = oneOf[i];

      options.push({
        label: item.title,
        value: i
      });
    }

    return (
      <Radio.Group key="radio-group"
        size="small"
        options={ options }
        value={ index }
        onChange={ root.$oneOfDisabled ? undefined : this.handleDesignationIndexChange.bind(this) }
      />
    );
  }

  render(): React.ReactNodeArray {
    const { element, root }: OneOfProps = this.props;
    const { index }: OneOfState = this.state;

    return [
      this.radioGroupView(root, index),
      element[index]
    ];
  }
}

export default OneOf;