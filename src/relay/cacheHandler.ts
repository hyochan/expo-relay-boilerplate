import { FetchFunction, QueryResponseCache } from 'relay-runtime';

import { forceFetch, isMutation, isQuery } from './utils';
import fetchQuery from './fetchGraphql';

const oneMinute = 60 * 1000;
const queryResponseCache = new QueryResponseCache({
  size: 250,
  ttl: oneMinute,
});

const cacheHandler: FetchFunction = async (request, variables, cacheConfig) => {
  const queryID = request.text || '';

  if (isMutation(request)) {
    queryResponseCache.clear();
    const mutationResult = await fetchQuery(request, variables);
    console.log('mutation', mutationResult);

    return mutationResult;
  }

  const fromCache = queryResponseCache.get(queryID, variables);
  // console.log('fromCache', queryID, fromCache);

  if (isQuery(request) && fromCache !== null && !forceFetch(cacheConfig)) {
    console.log('from cache', fromCache);

    return fromCache;
  }

  const fromServer = await fetchQuery(request, variables);
  // console.log('fromServer', fromServer);

  if (fromServer) {
    console.log(request.name, fromServer);

    queryResponseCache.set(queryID, variables, fromServer);
  }

  return fromServer;
};

export default cacheHandler;
