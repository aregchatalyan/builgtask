
export const fetcher = async (url: string, method: string = 'GET', body: any = null, headers: any = {}) => {
  if (body) {
    body = JSON.stringify(body);
    headers['Content-Type'] = 'application/json';
  }

  try {
    const response = await fetch(url, { method, body, headers, cache: 'no-store' });

    return await response.json();
  } catch (e) {
    throw e;
  }
}
