export default function subset(
  object: Record<string, any>,
  keys: string[],
): Record<string, any> {
  return keys.reduce((subsetObject, key) => {
    if (key in object) {
      subsetObject[key] = object[key];
    }

    return subsetObject;
  }, {});
}
