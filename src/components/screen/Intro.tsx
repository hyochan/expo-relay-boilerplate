import {
  GraphQLSubscriptionConfig,
  OperationType,
  RecordSourceSelectorProxy,
  SelectorData,
  SelectorStoreUpdater,
} from 'relay-runtime';
import Button from '../shared/Button';
import { IC_MASK } from '../../utils/Icons';
import React from 'react';
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

const ButtonWrapper = styled.View`
  position: absolute;
  flex-direction: column;
  bottom: 40px;
  width: 85%;
  align-self: center;
`;

const StyledTextInput = styled.TextInput`
  width: 320px;
  height: 40px;
  align-self: center;
  border-width: 1.3px;
  border-color: lightgray;
  border-radius: 3px;
  padding: 10px;
  margin-bottom: 5px;
  color: ${({ theme }): string => theme.fontColor};
`;

const ErrorMessage = styled.Text`
  color: #f57b51;
  width: 320px;
  align-self: center;
  margin-bottom: 10px;
`;

interface Props {
  navigation: RootStackNavigationProps<'Intro'>;
}

// Define a mutation query
const SignInEmailMutation = graphql`
  mutation IntroSignInEmailMutation($email: String!, $password: String!) {
    signInEmail(email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`;

const UserSubscription = graphql`
  subscription IntroUserSubscription {
    userSignedIn {
      id
      email
    }
  }
`;
// UserSubscription();

function Intro(props: Props): React.ReactElement {
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
      const res = response.signInEmail;
      console.log('Login!', response);
      setUser({
        id: res.user.id,
        token: res.token,
        email: '',
      });
      // props.navigation.navigate('Profile');
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
        data: SelectorData,
      ): void => {
        const payload = store.getRootField('userSignedIn');
        const email = payload?.getValue('email');
        console.log('useSubscription', email);
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
      <React.Suspense fallback={'Intro fallback...'}>
        <ButtonWrapper>
          <StyledTextInput
            value={email}
            onChangeText={(value: string): void => setEmail(value)}
            textContentType="emailAddress"
            placeholder="email"
          />
          <StyledTextInput
            value={password}
            onChangeText={(value: string): void => setPassword(value)}
            textContentType="password"
            secureTextEntry={true}
            placeholder="Password"
          />
          {error.length > 0 && (
            <ErrorMessage numberOfLines={1}>{error}</ErrorMessage>
          )}

          <Button
            testID="btn-login"
            imgLeftSrc={IC_MASK}
            isLoading={isInFlight}
            onClick={handleSignIn}
            text={getString('LOGIN')}
          />
          <View style={{ marginTop: 8 }} />
          <Button
            testID="btn-navigate"
            onClick={(): void =>
              props.navigation.navigate('Temp', {
                param: 'GO BACK',
              })
            }
            text={getString('NAVIGATE', { name: 'Temp' })}
          />
          <View style={{ marginTop: 8 }} />
          <Button
            testID="btn-theme"
            onClick={(): void => changeThemeType()}
            text={getString('CHANGE_THEME')}
          />
        </ButtonWrapper>
      </React.Suspense>
    </Container>
  );
}

export default Intro;
