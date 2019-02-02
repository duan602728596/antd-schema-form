import * as React from 'react';
import { Component, Context } from 'react';
import * as PropTypes from 'prop-types';
import { Requireable, ReactNodeLike } from 'prop-types';
import { Radio } from 'antd';
import { RadioChangeEvent } from 'antd/es/radio';
import AntdSchemaForm from '../../context';
import { isNumber } from '../../utils/type';
import { SchemaItem, ContextValue } from '../../types';

interface OneOfProps{
  root: SchemaItem;
  element: React.ReactNodeArray;
}

interface OneOfState{
  root?: SchemaItem;
  index?: number;
}

class OneOf extends Component<OneOfProps, OneOfState>{
  static contextType: Context<ContextValue> = AntdSchemaForm;
  static propTypes: {
    root: Requireable<object>,
    element: Requireable<ReactNodeLike>
  } = {
    root: PropTypes.object,
    element: PropTypes.arrayOf(PropTypes.node)
  };

  constructor(props: OneOfProps, ...argu: Array<any>){
    super(props, ...argu);

    const { root } = this.props;

    this.state = {
      root,
      index: isNumber(root.$oneOfIndex) ? root.$oneOfIndex : 0 // oneOf选项卡的index
    };
  }
  static getDerivedStateFromProps(nextProps: OneOfProps, prevState: OneOfState): { index: number }{
    if(nextProps.root !== prevState.root){
      const { root } = nextProps;

      return {
        index: isNumber(root.$oneOfIndex) ? root.$oneOfIndex : 0
      };
    }

    return null;
  }
  // 切换指定index
  handleDesignationIndexChange(event: RadioChangeEvent): void{
    const index: number = this.state.index;

    this.switchCallback(event.target.value, index);
  }
  // 切换的callback
  switchCallback(newIndex: number, oldIndex: number): void{
    const { root } = this.props;
    const { form } = this.context;
    const { oneOf } = root;

    // 这个情况是type="string"时，下一个控件是date，因为moment的关系，所以要清空组件的值，最好尽量避免这种情况
    if(
      oneOf[newIndex].type === 'string' && oneOf[oldIndex].type === 'string'                       // 新旧组件都为string
      && ((oneOf[oldIndex].$componentType !== 'date' && oneOf[newIndex].$componentType === 'date') // 判断是否为date组件
      || (oneOf[oldIndex].$componentType === 'date' && oneOf[newIndex].$componentType !== 'date'))
    ){
      form.resetFields([root.id]);
    }

    this.setState({ index: newIndex });
  }
  // 渲染radio
  radioGroupView(root: SchemaItem, index: number): React.ReactNode{
    const options: { label: string, value: number }[] = [];

    for(let i: number = 0, j: number = root.oneOf.length; i < j; i++){
      const item: SchemaItem = root.oneOf[i];

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
        onChange={ this.handleDesignationIndexChange.bind(this) }
      />
    );
  }
  render(): React.ReactNodeArray{
    const { element, root } = this.props;
    const { index } = this.state;

    return [
      this.radioGroupView(root, index),
      element[index]
    ];
  }
}

export default OneOf;