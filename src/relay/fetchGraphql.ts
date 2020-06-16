import AsyncStorage from '@react-native-community/async-storage';
import { GraphQLResponse } from 'relay-runtime';

const FETCH_URL = 'https://hackatalk.azurewebsites.net/graphql';

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
  return fetch(FETCH_URL, fetchConfig).then((response) => response.json());
}

export default fetchGraphQL;
