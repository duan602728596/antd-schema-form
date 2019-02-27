import * as React from 'react';
import { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Radio } from 'antd';
import AntdSchemaFormContext from '../../context';
import { isNumber } from '../../utils/type';
class OneOf extends Component {
    constructor(props, ...argu) {
        super(props, ...argu);
        const { root } = this.props;
        this.state = {
            root,
            index: isNumber(root.$oneOfIndex) ? root.$oneOfIndex : 0 // oneOf选项卡的index
        };
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.root !== prevState.root) {
            const { root } = nextProps;
            return {
                index: isNumber(root.$oneOfIndex) ? root.$oneOfIndex : 0
            };
        }
        return null;
    }
    // 切换指定index
    handleDesignationIndexChange(event) {
        const index = this.state.index;
        this.switchCallback(event.target.value, index);
    }
    // 切换的callback
    switchCallback(newIndex, oldIndex) {
        const { root } = this.props;
        const { form } = this.context;
        const { oneOf } = root;
        // 这个情况是type="string"时，下一个控件是date，因为moment的关系，所以要清空组件的值，最好尽量避免这种情况
        if (oneOf
            && oneOf[newIndex].type === 'string' && oneOf[oldIndex].type === 'string' // 新旧组件都为string
            && ((oneOf[oldIndex].$componentType !== 'date' && oneOf[newIndex].$componentType === 'date') // 判断是否为date组件
                || (oneOf[oldIndex].$componentType === 'date' && oneOf[newIndex].$componentType !== 'date'))) {
            form.resetFields([root.id]);
        }
        this.setState({ index: newIndex });
    }
    // 渲染radio
    radioGroupView(root, index) {
        const options = [];
        const oneOf = root.oneOf || [];
        for (let i = 0, j = oneOf.length; i < j; i++) {
            const item = oneOf[i];
            options.push({
                label: item.title,
                value: i
            });
        }
        return (React.createElement(Radio.Group, { key: "radio-group", size: "small", options: options, value: index, onChange: this.handleDesignationIndexChange.bind(this) }));
    }
    render() {
        const { element, root } = this.props;
        const { index } = this.state;
        return [
            this.radioGroupView(root, index),
            element[index]
        ];
    }
}
OneOf.contextType = AntdSchemaFormContext;
OneOf.propTypes = {
    root: PropTypes.object,
    element: PropTypes.arrayOf(PropTypes.node)
};
export default OneOf;
