// your-app-name/src/RelayEnvironment.js
import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import fetchGraphQL from './fetchGraphQL';

type PramsProps = {
  name: string;
  text: string;
};

async function fetchRelay(
  params: PramsProps,
  variables,
): Promise<typeof fetchGraphQL> {
  console.log(
    `fetching query ${params.name} with ${JSON.stringify(variables)}`,
  );
  return fetchGraphQL(params.text, variables);
}

export default new Environment({
  network: Network.create(fetchRelay),
  store: new Store(new RecordSource()),
});
