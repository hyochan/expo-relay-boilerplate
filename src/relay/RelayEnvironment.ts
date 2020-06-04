import {
  CacheConfig,
  Environment,
  GraphQLResponse,
  Network,
  RecordSource,
  RequestParameters,
  Store,
  Variables,
} from 'relay-runtime';
import subscribeGraphQL, { SubscribeFunction } from './subscribeGraphQL';
import AsyncStorage from '@react-native-community/async-storage';
import fetchGraphQL from './fetchGraphQL';

function fetchFunction(
  request: RequestParameters,
  variables: Variables,
  cacheConfig: CacheConfig,
): Promise<GraphQLResponse> {
  return AsyncStorage.getItem('@UserStorage:login_token').then((token) => {
    return fetchGraphQL(request, variables, cacheConfig, token);
  });
}

function subscribeFunction(
  request: RequestParameters,
  variables: Variables,
  cacheConfig: CacheConfig,
): SubscribeFunction {
  return subscribeGraphQL(request, variables, cacheConfig);
}

export default new Environment({
  network: Network.create(fetchFunction, subscribeFunction),
  store: new Store(new RecordSource()),
});
