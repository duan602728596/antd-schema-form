const name: string = 'schema-form-';

/**
 * 返回一个类名
 * @param { string } className: 类名
 */
function styleName(className: string): string {
  return `${ name }${ className }`;
}

export default styleName;