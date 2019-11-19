import sortBy from 'lodash-es/sortBy';

/* 对root.properties进行排序 */
function sortProperties(properties: object): object {
  const propertiesArr: Array<[string, any]> = Object.entries(properties);
  const sortPropertiesArr: Array<[string, any]> = sortBy(propertiesArr, function(o: [string, any]): number {
    return o[1].$order ?? 0;
  });

  // @ts-ignore
  return Object.fromEntries(sortPropertiesArr);
}

export default sortProperties;