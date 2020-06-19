import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import { EnvironmentConfig } from 'relay-runtime/lib/store/RelayModernEnvironment';
import cacheHandler from './cacheHandler';
import { relayTransactionLogger } from './utils';
import subscribeGraphQL from './subscribeGraphQL';

const __DEV__ = process.env.NODE_ENV === 'development';

const getRelayConfig = (): EnvironmentConfig => {
  return {
    configName: new Date().getSeconds().toString(), // temp value for testing
    network: Network.create(cacheHandler, subscribeGraphQL),
    store: new Store(new RecordSource()),
    log: __DEV__ ? relayTransactionLogger : null,
  };
};

class Relay {
  environment: Environment = new Environment(getRelayConfig());

  constructor() {
    this.init();
  }

  init(): void {
    if (__DEV__) console.log('relay env instance initialized');
    this.environment = new Environment(getRelayConfig());
  }
}

export default new Relay();
