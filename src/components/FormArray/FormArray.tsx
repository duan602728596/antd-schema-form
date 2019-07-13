import * as React from 'react';
import { useContext, PropsWithChildren } from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { Form, Tooltip } from 'antd';
import { GetFieldDecoratorOptions, ValidationRule } from 'antd/lib/form/Form';
import AntdSchemaFormContext from '../../context';
import styleName from '../../utils/styleName';
import createArrayRules from './createArrayRules';
import createElement from '../../utils/createElement';
import { ArrayItem, ContextValue } from '../../types';

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
  const { root, required }: FormArrayProps = props;
  const { title, description, $componentType, $defaultValue, $hidden }: ArrayItem = root;
  const rules: Array<ValidationRule> = createArrayRules(languagePack, root, required);
  const option: GetFieldDecoratorOptions = { rules };
  let isTableComponent: boolean = false; // 判断是否为table组件

  // 表单默认值
  if ($defaultValue) option.initialValue = $defaultValue;

  let element: React.ReactNode = null;

  if (customComponent) {
    // TODO: 此处渲染的是CheckBox.Group，但是组件名称是"checkbox"
    const cType: string | undefined = $componentType === 'checkbox' ? 'checkboxGroup' : $componentType;

    if (cType && cType in customComponent) {
      element = customComponent[cType](root, option, form, required);
    } else {
      element = createElement(customComponent.defaultArray, [root, option, form, required]);
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