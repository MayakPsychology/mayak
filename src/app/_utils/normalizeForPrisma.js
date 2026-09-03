export function normalizeForPrisma(obj) {
  if (Array.isArray(obj)) {
    return obj.map(normalizeForPrisma);
  }

  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value === '' || value === undefined || value === 'undefined') {
      acc[key] = null;
    } else if (Array.isArray(value)) {
      acc[key] = value.length === 0 ? [] : value.map(normalizeForPrisma);
    } else if (typeof value === 'object' && value !== null) {
      acc[key] = normalizeForPrisma(value);
    } else {
      acc[key] = value;
    }
    return acc;
  }, {});
}
