const BASE_URL = 'https://swapi.co/api';

const searchParams = params => {
  return Object.keys(params).map(key =>
    `${key}=${encodeURIComponent(params[key])}`
  ).join('&');

}

const fetchData = (endpoint, params = {}) => {
  const url = `${BASE_URL}${endpoint}?${searchParams(params)}`;
  console.log('url', url)
  return fetch(url)
    .then(response => response.json())
    .catch(error => error.message);
};

export const getStarships = async (params) => {
  let endpoint = '/starships/';
  return fetchData(endpoint, params);
}

export const getStarship = async ({id}) => {
  let endpoint = `/starships/${id}/`;
  return await fetchData(endpoint);
}
