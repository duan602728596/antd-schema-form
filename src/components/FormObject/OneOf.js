import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
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
  // 切换上一个
  handlePrevIndexClick: Function = (event: Event): void=>{
    const { element }: { element: React.ChildrenArray<React.Element> } = this.props;
    const { index }: { index: number } = this.state;
    let newIndex: ?number = null;

    if(index === 0) newIndex = element.length - 1;
    else newIndex = index - 1;

    this.switchCallback(newIndex, index);
  };
  // 切换下一个
  handleNextIndexClick: Function = (event: Event): void=>{
    const { element }: { element: React.ChildrenArray<React.Element> } = this.props;
    const { index }: { index: number } = this.state;
    let newIndex: ?number = null;

    if(index === element.length - 1) newIndex = 0;
    else newIndex = index + 1;

    this.switchCallback(newIndex, index);
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
  render(): React.Element{
    const { element }: { element: React.ChildrenArray<React.Element> } = this.props;
    const { index }: { index: number } = this.state;

    return (
      <div className={ styleName('oneOf-box') }>
        { element[index] }
        {/* 切换按钮 */}
        <p className={ styleName('oneOf-index') }>{ index + 1 } / { element.length }</p>
        <Button.Group className={ styleName('oneOf-group') }>
          <Button icon="left" title="上一个" onClick={ this.handlePrevIndexClick } />
          <Button icon="right" title="下一个" onClick={ this.handleNextIndexClick } />
        </Button.Group>
      </div>
    );
  }
}

export default OneOf;