export function formatTableValue(rawArray: Array): Array{
  const result: [] = [];

  for(const item: any of rawArray){
    result.push({ value: item });
  }

  return result;
}