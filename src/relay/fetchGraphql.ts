import AsyncStorage from '@react-native-community/async-storage';
import { GraphQLResponse } from 'relay-runtime';
import { URL } from '../../config';

async function fetchGraphQL(request, variables): Promise<GraphQLResponse> {
  console.log(
    `fetching query ${request.name} with ${JSON.stringify(variables)}`,
  );

  const authorization =
    (await AsyncStorage.getItem('@UserStorage:login_token')) || '';

  const fetchConfig = {
    method: 'POST',
    headers: {
      authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: request.text,
      variables,
    }),
  };
  return fetch(URL.GRAPHQL_FETCH, fetchConfig).then((response) =>
    response.json(),
  );
}

export default fetchGraphQL;
