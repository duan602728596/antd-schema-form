import { ObjectEntries, ObjectFromEntries } from './lodash';

/* 对root.properties进行排序 */
function sortProperties(properties: object): object {
  const propertiesArr: Array<[string, any]> = ObjectEntries(properties);
  const sortPropertiesArr: Array<[string, any]> = propertiesArr.sort(
    function(a: [string, any], b: [string, any]): number {
      return (a[1].$order ?? 0) - (b[1].$order ?? 0);
    });

  return ObjectFromEntries(sortPropertiesArr);
}

export default sortProperties;