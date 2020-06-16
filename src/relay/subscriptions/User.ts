// General Relay Subscription
import {
  GraphQLTaggedNode,
  Variables,
  graphql,
  requestSubscription,
} from 'react-relay';
import { RecordSourceSelectorProxy } from 'relay-runtime';

import RelayEnvironment from '../RelayEnvironment';

const UserSubscription: GraphQLTaggedNode = graphql`
  subscription UserSubscription($userId: ID!) {
    userSignedIn(userId: $userId) {
      id
      email
    }
  }
`;

export default (): void => {
  const variables: Variables = { userId: '' };
  const config = {
    subscription: UserSubscription,
    variables,
    onCompleted: (): void => {
      console.log('Subscription is now closed.');
    },
    onError: (error: Error): void => console.log('An error occured:', error),
    updater: (
      store: RecordSourceSelectorProxy<unknown>,
      data: unknown,
    ): void => {
      const payload = store.getRootField('userSignedIn');
      const email = payload?.getValue('email');
      console.log(email);
    },
  };

  console.log('Listening...');

  requestSubscription(RelayEnvironment.get(), config);
};
