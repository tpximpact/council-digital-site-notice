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
    const {
      _id,
      _type,
      _rev,
      _createdAt,
      _updatedAt,
      applicationNumber,
      ...rest
    } = obj;

    // Create a copy that excludes hidden fields for comparison
    const normalized = { ...rest };

    // Exclude fields when their toggle is false - this ensures objects are considered
    // identical when their show* flag is false, even if one has a value and the
    // other doesn't
    if (!normalized.showAccess) delete normalized.access;
    if (!normalized.showOpenSpace) delete normalized.openSpaceArea;
    if (!normalized.showHousing) delete normalized.housing;
    if (!normalized.showCarbon) delete normalized.carbonEmissions;
    if (!normalized.showJobs) delete normalized.jobs;

    return sortObjectKeys(normalized);
  };

  const normalizedApp = normalizeObject(application);
  const normalizedData = normalizeObject(data);

  return JSON.stringify(normalizedApp) !== JSON.stringify(normalizedData);
}
