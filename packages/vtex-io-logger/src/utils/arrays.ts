export function addItemToPosition<T>(array: T[], item: any, position: number) {
  const newArray = [...array];

  newArray.splice(position, 0, item as T);

  return newArray;
}
