import * as React from 'react';
import { useContext, PropsWithChildren } from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { Form, Tooltip, Select, Checkbox } from 'antd';
import { GetFieldDecoratorOptions, ValidationRule, WrappedFormUtils } from 'antd/lib/form/Form';
import omit from 'lodash-es/omit';
import AntdSchemaFormContext from '../../context';
import TableComponent from './TableComponent';
import styleName from '../../utils/styleName';
import createArrayRules from './createArrayRules';
import { ArrayItem, ContextValue } from '../../types';

// select的下拉框
function selectOptionsView(options: Array<{ label: string; value: string }>): React.ReactNodeArray {
  return options.map((item: { label: string; value: string }, index: number): React.ReactNode => {
    return <Select.Option key={ `${ index }` } value={ item.value }>{ item.label }</Select.Option>;
  });
}

/**
 * 当类型为array时的组件渲染
 * json schema的属性包括：id, type, title, description, items, minItems, maxItems
 *
 * 扩展属性前必须加上"$"
 * 扩展属性包括：componentType, options, addDataInReverseOrder
 */
interface FormArrayProps {
  root: ArrayItem;
  required: boolean;
}

function FormArray(props: PropsWithChildren<FormArrayProps>): React.ReactElement | null {
  const context: ContextValue | {} = useContext(AntdSchemaFormContext);

  if (!('form' in context)) return null; // 类型判断

  const { form, customComponent, languagePack }: ContextValue = context;
  // @ts-ignore: getFieldProps in rc-form
  const { getFieldDecorator, getFieldProps }: WrappedFormUtils = form;
  const { root, required }: FormArrayProps = props;
  const { id, title, description, $componentType, $defaultValue, $options = [], $hidden }: ArrayItem = root;
  const rules: Array<ValidationRule> = createArrayRules(languagePack, root, required);
  const option: GetFieldDecoratorOptions = { rules };
  let isTableComponent: boolean = false; // 判断是否为table组件
  let element: React.ReactNode = null;

  // 表单默认值
  if ($defaultValue) option.initialValue = $defaultValue;

  switch ($componentType) {
    case 'checkbox':
      element = getFieldDecorator(id, option)(<Checkbox.Group options={ $options } />);
      break;

    case 'multiple':
    case 'tags':
      element = getFieldDecorator(id, option)(
        <Select className={ styleName('array-multiple') } mode={ $componentType }>
          { selectOptionsView($options) }
        </Select>
      );
      break;

    default:
      if (customComponent && $componentType && $componentType in customComponent) {
        element = customComponent[$componentType](root, option, form, required);
      } else {
        const props: any = omit(getFieldProps(id, option), ['ref']);

        element = <TableComponent root={ root } { ...props } />;
        isTableComponent = true;
      }
  }

  const classname: string = classNames({
    [styleName('array-table-form-item')]: isTableComponent,
    [styleName('hidden')]: $hidden
  });

  return (
    <Form.Item className={ classname } label={ title }>
      <Tooltip title={ description } placement="topRight">
        { element }
      </Tooltip>
    </Form.Item>
  );
}

FormArray.propTypes = {
  root: PropTypes.object,
  required: PropTypes.bool
};

export default FormArray;