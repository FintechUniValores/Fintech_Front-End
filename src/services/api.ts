const API_BASE_URL = 'http://10.0.2.2:8080/api';

export const authenticatedFetch = async (
  url: string,
  options: RequestInit = {},
  sessionId: string,
) => {
  const headers = {
    'Content-Type': 'application/json',
    'X-Session-ID': sessionId,
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API call failed with status: ${response.status}`);
  }
  return response.json();
};
