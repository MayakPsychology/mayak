export const calculateMapBounds = points => {
  let latitudes;
  let longitudes;

  const padding = 0.006;

  if (!points.length) {
    return null;
  }

  if (points.length === 1) {
    latitudes = [points[0].latitude - padding, points[0].latitude + padding];
    longitudes = [points[0].longitude - padding, points[0].longitude + padding];
  }

  if (points.length >= 2) {
    latitudes = points.map(point => point.latitude);
    longitudes = points.map(point => point.longitude);
  }

  const minLat = Math.min(...latitudes);
  const minLng = Math.min(...longitudes);
  const maxLat = Math.max(...latitudes);
  const maxLng = Math.max(...longitudes);

  return [
    [minLat, minLng],
    [maxLat, maxLng],
  ];
};
