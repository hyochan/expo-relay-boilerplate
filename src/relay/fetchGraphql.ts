import { GraphQLResponse } from 'relay-runtime';

const FETCH_URL = 'https://hackatalk.azurewebsites.net/graphql';

function fetchGraphQL(
  request,
  variables,
  cacheConfig,
  token,
): Promise<GraphQLResponse> {
  console.log(
    `fetching query ${request.name} with ${JSON.stringify(variables)}`,
  );
  const fetchConfig = {
    method: 'POST',
    headers: {
      Authorization: token || '',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: request.text,
      variables,
    }),
  };
  return fetch(FETCH_URL, fetchConfig).then((response) => response.json());
}

export default fetchGraphQL;
