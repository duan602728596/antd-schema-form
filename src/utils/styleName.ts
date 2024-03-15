const prefix: string = 'schema-form-';

/**
 * 返回一个类名
 * @param { string } className - 类名
 */
function styleName(className: string): string {
  return `${ prefix }${ className }`;
}

export default styleName;