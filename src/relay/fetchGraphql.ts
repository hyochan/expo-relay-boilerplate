import { GraphQLResponse } from 'relay-runtime';

const FETCH_URL = 'https://hackatalk.azurewebsites.net/graphql';

function fetchGraphQL(
  request,
  variables,
  cacheConfig,
): Promise<GraphQLResponse> {
  console.log(
    `fetching query ${request.name} with ${JSON.stringify(variables)}`,
  );
  return fetch(FETCH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: request.text,
      variables,
    }),
  }).then((response) => response.json());
}

export default fetchGraphQL;
