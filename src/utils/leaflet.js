export const calculateMapBounds = points => {
  const latitudes = points.map(point => point.latitude);
  const longitudes = points.map(point => point.longitude);

  const PADDING = 0.005;

  const minLat = Math.min(...latitudes);
  const minLng = Math.min(...longitudes);
  const maxLat = Math.max(...latitudes);
  const maxLng = Math.max(...longitudes);

  return [
    [minLat - PADDING, minLng - PADDING],
    [maxLat + PADDING, maxLng + PADDING],
  ];
};
