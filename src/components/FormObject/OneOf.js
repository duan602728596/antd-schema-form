import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Radio } from 'antd';
import Context from '../../context';
import styleName from '../../utils/styleName';
import { isNumber } from '../../utils/type';

class OneOf extends Component{
  static contextType: Object = Context;
  static propTypes: Object = {
    root: PropTypes.object,
    element: PropTypes.array
  };

  constructor(): void{
    super(...arguments);

    const { root }: { root: Object } = this.props;

    this.state = {
      root,
      index: isNumber(root.$oneOfIndex) ? root.$oneOfIndex : 0 // oneOf选项卡的index
    };
  }
  static getDerivedStateFromProps(nextProps: Object, prevState: Object): ?Object{
    if(nextProps.root !== prevState.root){
      const { root }: { root: Object } = nextProps;

      return {
        index: isNumber(root.$oneOfIndex) ? root.$oneOfIndex : 0
      };
    }
    return null;
  }
  // 切换指定index
  handleDesignationIndexChange: Function = (event: Event): void=>{
    const index: number = this.state.index;

    this.switchCallback(event.target.value, index);
  };
  // 切换的callback
  switchCallback(newIndex: number, index: number): void{
    const { root }: { root: Object } = this.props;
    const { form }: { form: Object } = this.context;
    const { oneOf }: { oneOf: [] } = root;

    //  如果type不同，还需要重置表单
    if(!(
      oneOf[newIndex].type
      && oneOf[index].type
      && (oneOf[newIndex].type === oneOf[index].type)
      && oneOf[newIndex].$componentType !== 'date'
    )){
      form.resetFields([root.id]);
    }

    this.setState({
      index: newIndex
    });
  }
  // 渲染dot
  listBoxDotView(index: number, len: number): React.ChildrenArray<React.Element>{
    const element: React.ChildrenArray<React.Element> = [];

    for(let i: number = 0; i < len; i++){
      element.push(
        <li key={ i }
          className={ index === i ? styleName('oneOf-current') : null }
          role="button"
          tabIndex={1}
          onClick={ this.handleDesignationIndexClick.bind(this, i) }
        />
      );
    }

    return element;
  }
  // 渲染radio
  radioGroupView(root: Object, index: number): React.ChildrenArray<React.Element>{
    const options: { label: string, value: index }[] = [];

    for(let i: number = 0, j: number = root.oneOf.length; i < j; i++){
      const item: Object = root.oneOf[i];

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
        onChange={ this.handleDesignationIndexChange }
      />
    );
  }
  render(): React.Element{
    const { languagePack }: { languagePack: Object } = this.context;
    const { element, root }: {
      element: React.ChildrenArray<React.Element>,
      root: Object
    } = this.props;
    const { index }: { index: number } = this.state;

    return [
      this.radioGroupView(root, index),
      <div key="oneOf-box" className={ styleName('oneOf-box') }>{ element[index] }</div>
    ];
  }
}

export default OneOf;