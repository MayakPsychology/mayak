export const calculateMapBounds = points => {
  if (!points.length) {
    return [];
  }

  const padding = 0.006;

  // Provided only one pair of latitude and longitude, use padding to simulate a rectangular are for mapping.
  // This ensures constructing a valid bounding box for the map.
  const pointsNormalized =
    points.length >= 2
      ? points
      : [
        { latitude: points[0].latitude - padding, longitude: points[0].longitude - padding },
        { latitude: points[0].latitude + padding, longitude: points[0].longitude + padding },
      ];

  const latitudes = pointsNormalized.map(point => point.latitude);
  const longitudes = pointsNormalized.map(point => point.longitude);

  return [
    [Math.min(...latitudes), Math.min(...longitudes)],
    [Math.max(...latitudes), Math.max(...longitudes)],
  ];
};
