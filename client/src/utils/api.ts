const BASE_URL = import.meta.env.API_BASE_URL;

export const apiFetch = (endpoint: string, options?: RequestInit) => {
  const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  return fetch(`${BASE_URL}${formattedEndpoint}`, options);
};
