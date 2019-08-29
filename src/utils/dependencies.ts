import isArray from 'lodash-es/isArray';

type FormatId = [string, string | undefined];

export function formatId(id: string): FormatId {
  const idbArray: string[] = id.split(/\//g);
  const name: string | undefined = idbArray.pop();

  return [idbArray.join('/'), name];
}

/**
 * 创建dependencies数组
 * @param { string } id
 * @param { Array<string> } dependencies
 */
function getDependenciesArr(id: string, dependencies: { [key: string]: Array<string> }): Array<string> | undefined {
  const [path, name]: FormatId = formatId(id);

  if (name && isArray(dependencies[name])) {
    return dependencies[name].map((item: string, index: number): string => `${ path }/${ item }`);
  }
}

export default getDependenciesArr;