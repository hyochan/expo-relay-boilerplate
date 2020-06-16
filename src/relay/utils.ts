import {
  CacheConfig,
  LogRequestInfoFunction,
  RequestParameters,
} from 'relay-runtime';

enum operationKind {
  MUTATION = 'mutation',
  QUERY = 'query',
}

export const isMutation = (request: RequestParameters): boolean =>
  request.operationKind === operationKind.MUTATION;

export const isQuery = (request: RequestParameters): boolean =>
  request.operationKind === operationKind.QUERY;

export const forceFetch = (cacheConfig: CacheConfig): boolean =>
  !!(cacheConfig && cacheConfig.force);

export const relayTransactionLogger = () => (
  event: LogRequestInfoFunction,
): void => {
  console.log('RELAY: ', event);
};
