import pick from 'lodash-es/pick';
import isNil from 'lodash-es/isNil';
import { FormInstance, Store } from 'rc-field-form/es/interface';

type ShouldUpdateFunc = ((prevValues: Store, nextValues: Store, info: {
  source?: string;
}) => boolean);

/* 移除id的最后一位 */
export function getBaseId(id: string): string {
  const idbArray: string[] = id.split(/\//g);

  idbArray.pop();

  return idbArray.join('/');
}

/* 获取名称 */
export function getName(id: string): string | undefined {
  const idbArray: string[] = id.split(/\//g);

  return idbArray.pop();
}

/* 更新函数 */
export function createShouldUpdateFunc(form: FormInstance, id: string, depName: string[]): ShouldUpdateFunc {
  const baseId: string = getBaseId(id);
  const valueKey: string[] = depName.map((item: string, index: number): string => `${ baseId }/${ item }`);

  return function(prevValue: Store, nextValue: Store): boolean {
    const value: Store = pick(nextValue, valueKey);
    let update: boolean = false;

    for (const key in value) {
      if (!isNil(value[key])) {
        update = true;
        break;
      }
    }

    console.log(update);

    return update;
  };
}