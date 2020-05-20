// General Relay Subscription
import {
  GraphQLTaggedNode,
  Variables,
  graphql,
  requestSubscription,
} from 'react-relay';
import { RecordSourceSelectorProxy, SelectorData } from 'relay-runtime';
import environment from '../RelayEnvironment';

const UserSubscription: GraphQLTaggedNode = graphql`
  subscription UserSubscription {
    userSignedIn {
      id
      email
    }
  }
`;

export default (): void => {
  const variables: Variables = {};
  const config = {
    subscription: UserSubscription,
    variables,
    onCompleted: (): void => {
      console.log('Subscription is now closed.');
    },
    onError: (error: Error): void => console.log('An error occured:', error),
    updater: (store: RecordSourceSelectorProxy, data: SelectorData): void => {
      const payload = store.getRootField('userSignedIn');
      const email = payload?.getValue('email');
      console.log(email);
    },
  };

  console.log('Listening...');

  requestSubscription(environment, config);
};
