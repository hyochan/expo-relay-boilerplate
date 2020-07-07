import type {
  SignInEmailMutation,
  SignInEmailMutationResponse,
} from '__generated__/SignInEmailMutation.graphql';
import { graphql, useMutation } from 'react-relay/hooks';
import styled, { css } from 'styled-components/native';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthStackNavigationProps } from '../navigation/AuthStackNavigator';
import Button from '../shared/Button';
import Constants from 'expo-constants';
import React from 'react';
import { useAuthContext } from '../../providers/AuthProvider';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }): string => theme.background};
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const WebCss = css`
  cursor: pointer;
`;
const MobileCss = css`
  /* cursor: pointer; */
`;

const StyledImage = styled.Image`
  border-radius: 15px;
  align-self: center;
  margin: 25px;
  ${Constants.platform?.web ? WebCss : MobileCss};
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

const StyledText = styled.Text`
  width: 320px;
  text-align: center;
  margin: 10px 0;
`;

const SignupText = styled(StyledText)`
  color: #373d78;
  text-decoration: underline;
`;

const ErrorMessage = styled(StyledText)`
  color: #f57b51;
`;

interface Props {
  navigation: AuthStackNavigationProps<'SignIn'>;
}

const SignInEmail = graphql`
  mutation SignInEmailMutation($email: String!, $password: String!) {
    signInEmail(email: $email, password: $password) {
      token
      user {
        id
        email
        name
        photoURL
      }
    }
  }
`;

function SignIn(props: Props): React.ReactElement {
  const { setUser } = useAuthContext();
  const [email, setEmail] = React.useState<string>('ethan1@test.com');
  const [password, setPassword] = React.useState<string>('test');
  const [error, setError] = React.useState<string>('');

  const [commit, isInFlight] = useMutation<SignInEmailMutation>(SignInEmail);

  const mutationConfig = {
    variables: {
      email,
      password,
    },
    onCompleted: async (response: SignInEmailMutationResponse): void => {
      const { token, user } = response.signInEmail;
      await AsyncStorage.setItem('@UserStorage:login_token', token);

      setUser({
        ...user,
      });
    },
    onError: (error): void => {
      console.error(error);
      setError('Check your email and password');
    },
  };

  const handleClick = (): void => {
    setError('');
    commit(mutationConfig);
  };

  const moveScreen = (): void => {
    props.navigation.navigate('SignUp');
  };

  React.useEffect(() => {
    console.log('[AuthStack] mounted');
  }, []);

  return (
    <Container>
      <StyledImage
        style={{ width: 150, height: 150 }}
        source={{
          uri: 'https://avatars2.githubusercontent.com/u/45788556?s=200&v=4',
        }}
      />
      <StyledTextInput
        testID="input-email"
        value={email}
        onChangeText={(value: string): void => setEmail(value)}
        textContentType="emailAddress"
        placeholder="email"
      />
      <StyledTextInput
        testID="input-password"
        value={password}
        onChangeText={(value: string): void => setPassword(value)}
        textContentType="password"
        secureTextEntry={true}
        placeholder="Password"
      />
      <ErrorMessage testID="error-text" numberOfLines={1}>{error}</ErrorMessage>
      <Button
        testID="btn-signin"
        onClick={handleClick}
        text={'SignIn'}
        isLoading={isInFlight}
      />
      <SignupText onPress={moveScreen}>
        {"Don't have an account yet?"}
      </SignupText>
    </Container>
  );
}

export default SignIn;
