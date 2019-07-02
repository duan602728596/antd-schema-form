/* 简单的template模板 */
function template(tpl: string, data: { [key: string]: any }): string {
  let result: string = tpl;

  for (const key in data) {
    const reg: RegExp = new RegExp(`{\\s*${ key }\\s*}`, 'g');

    result = result.replace(reg, `${ data[key] }`);
  }

  return result;
}

export default template;