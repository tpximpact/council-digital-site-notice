export function checkAllowedUpdateFields(
  application: { [key: string]: any },
  data: { [key: string]: any },
) {
  const sortObjectKeys = (obj: any): any => {
    if (obj === null || typeof obj !== "object") return obj;
    if (Array.isArray(obj)) return obj.map(sortObjectKeys);
    return Object.keys(obj)
      .sort()
      .reduce((sorted: any, key) => {
        sorted[key] = sortObjectKeys(obj[key]);
        return sorted;
      }, {});
  };

  const normalizeObject = (obj: any) => {
    // Remove Sanity-specific fields
    const {
      _id,
      _type,
      _rev,
      _createdAt,
      _updatedAt,
      applicationNumber,
      ...rest
    } = obj;
    return sortObjectKeys(rest);
  };

  return (
    JSON.stringify(normalizeObject(application)) !==
    JSON.stringify(normalizeObject(data))
  );
}
