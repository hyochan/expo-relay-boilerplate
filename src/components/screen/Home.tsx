import Button from '../shared/Button';
import { IC_MASK } from '../../utils/Icons';
import type { IntroUserSubscriptionResponse } from './__generated__/IntroUserSubscription.graphql';
import React from 'react';
import { RecordSourceSelectorProxy } from 'relay-runtime';
import { RootStackNavigationProps } from '../navigation/RootStackNavigator';
import { View } from 'react-native';
import { getString } from '../../../STRINGS';
import graphql from 'babel-plugin-relay/macro';
import styled from 'styled-components/native';
import { useAppContext } from '../../providers/AppProvider';
import { useMutation } from 'react-relay/hooks';
import { useSubscription } from 'relay-hooks';
import { useThemeContext } from '../../providers/ThemeProvider';

const Container = styled.View`
  flex: 1;
  align-self: stretch;
  overflow: scroll;
  background-color: ${({ theme }): string => theme.background};

  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
`;

interface Props {
  navigation: RootStackNavigationProps<'Main'>;
}

// Define a mutation query
const SignInEmailMutation = graphql`
  mutation HomeSignInEmailMutation($email: String!, $password: String!) {
    signInEmail(email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`;

const UserSubscription = graphql`
  subscription HomeUserSubscription {
    userSignedIn {
      id
      email
    }
  }
`;
// UserSubscription();

function Home(props: Props): React.ReactElement {
  const { setUser } = useAppContext();
  const { changeThemeType } = useThemeContext();
  const [email, setEmail] = React.useState<string>('ethan1@test.com');
  const [password, setPassword] = React.useState<string>('test');
  const [error, setError] = React.useState<string>('');

  // isInFlight will be true if any mutation triggered by calling commit is still in flight.
  // commit is a function that accepts a UseMutationConfig. The type of UseMutationConfig is as follows:
  const [commit, isInFlight] = useMutation(SignInEmailMutation);

  const mutationConfig = {
    variables: {
      email,
      password,
    },
    onCompleted: (response): void => {
      console.log('Mutatiion successed!', response);
    },
    onError: (error): void => {
      console.error(error);
      setError('Check your email and password');
    },
  };

  const subscriptionConfig = React.useMemo(
    () => ({
      variables: {},
      subscription: UserSubscription,
      onCompleted: (): void => console.log('Subscription is now closed.'),
      updater: (
        store: RecordSourceSelectorProxy<{}>,
        data: IntroUserSubscriptionResponse,
      ): void => {
        if (data.userSignedIn?.id && data.userSignedIn?.email) {
          setUser({
            id: data.userSignedIn.id,
            email: data.userSignedIn.email,
            token: '',
          });
          // props.navigation.navigate('Profile');
        }
      },
    }),
    [],
  );

  // Create a subscription when the component is mounted with the given config
  // Unsubscribe from that subscription when the component is unmounted
  useSubscription(subscriptionConfig);

  const handleSignIn = (): void => {
    setError('');
    commit(mutationConfig);
  };

  return (
    <Container>
      <React.Suspense fallback={'Home fallback...'}>
        Home
      </React.Suspense>
    </Container>
  );
}

export default Home;
