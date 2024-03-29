export function getSearchParamsFromRequest(request, defaultValues = {}, transform = it => it) {
  if (!request?.url) return {};
  try {
    const url = new URL(request.url);
    const searchParams = Object.fromEntries(url.searchParams.entries());

    // Handle multiple values for the same key
    url.searchParams.forEach((_, key) => {
      if (url.searchParams.getAll(key).length > 1) {
        searchParams[key] = url.searchParams.getAll(key);
      }
    });

    return transform({ ...defaultValues, ...searchParams });
  } catch (e) {
    console.error(e);
    return {};
  }
}
