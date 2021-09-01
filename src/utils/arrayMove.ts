/**
 * The specific implementation of array-move, the code comes from https://github.com/sindresorhus/array-move
 * Since array-move@4 only supports esm, copy the code
 *
 * array-move的具体实现，代码来自https://github.com/sindresorhus/array-move
 * 由于array-move@4只支持esm，所以将代码拷贝过来
 *
 * array-move license: https://github.com/sindresorhus/array-move/blob/main/license
 */
export function arrayMoveImmutable(rawArray: Array<any>, fromIndex: number, toIndex: number): Array<any> {
  const array: Array<any> = [...rawArray];
  const startIndex: number = fromIndex < 0 ? array.length + fromIndex : fromIndex;

  if (startIndex >= 0 && startIndex < array.length) {
    const endIndex: number = toIndex < 0 ? array.length + toIndex : toIndex;
    const [item]: any[] = array.splice(fromIndex, 1);

    array.splice(endIndex, 0, item);
  }

  return array;
}