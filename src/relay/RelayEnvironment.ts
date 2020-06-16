import {
  CacheConfig,
  Environment,
  Network,
  RecordSource,
  RequestParameters,
  Store,
  Variables,
} from 'relay-runtime';
import subscribeGraphQL, { SubscribeFunction } from './subscribeGraphQL';
import cacheHandler from './cacheHandler';
// import { relayTransactionLogger } from './utils';

const __DEV__ = process.env.NODE_ENV === 'development';

function subscribeFunction(
  request: RequestParameters,
  variables: Variables,
  cacheConfig: CacheConfig,
): SubscribeFunction {
  return subscribeGraphQL(request, variables, cacheConfig);
}

export const relayEnvConfig = {
  network: Network.create(cacheHandler, subscribeFunction),
  store: new Store(new RecordSource()),
  // log: __DEV__ ? relayTransactionLogger() : null,  // incompatible with Environment type
};

export type RelayEnvironmentProps = Environment;

class RelayEnvironment {
  environment: RelayEnvironmentProps | null = null;

  constructor() {
    console.log('relay env instance initialized');
    this.reset();
  }

  reset(): void {
    if (this.environment) console.log('relay env instance recreated');
    this.environment = new Environment(relayEnvConfig);
  }

  get(): RelayEnvironmentProps {
    return this.environment || new Environment(relayEnvConfig);
  }
}

export default new RelayEnvironment();
