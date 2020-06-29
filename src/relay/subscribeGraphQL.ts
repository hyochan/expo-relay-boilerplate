import { Disposable, GraphQLResponse, Observable } from 'relay-runtime';
import { RelayObservable } from 'relay-runtime/lib/network/RelayObservable';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { URL } from '../../config';

export type SubscribeFunction = RelayObservable<GraphQLResponse> | Disposable;

const subscriptionClient = new SubscriptionClient(URL.GRAPHQL_SUBSCRIBE, {
  reconnect: true,
});

function subscribeGraphQL(request, variables, cacheConfig): SubscribeFunction {
  // Note: https://github.com/facebook/relay/issues/2869#issuecomment-534905537
  const subscribeObservable = subscriptionClient.request({
    query: request.text,
    operationName: request.name,
    variables,
  });
  console.log('Listening...');

  return Observable.from<any>(subscribeObservable);
}

export default subscribeGraphQL;
