import React, { FC } from 'react';
import type {
  SignUpMutation,
  SignUpMutationResponse,
} from './__generated__/SignUpMutation.graphql';
import { graphql, useMutation } from 'react-relay/hooks';
import AsyncStorage from '@react-native-community/async-storage';

import { AuthStackNavigationProps } from '../navigation/AuthStackNavigator';
import Button from '../shared/Button';
import styled from 'styled-components/native';
import { useAppContext } from '../../providers/AppProvider';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }): string => theme.background};
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

const ErrorMessage = styled(StyledText)`
  color: #f57b51;
`;

interface Props {
  navigation: AuthStackNavigationProps<'SignUp'>;
}

type State = {
  email: string;
  password: string;
  name: string;
  statusMessage: string;
};

const initialState = {
  email: '',
  password: '',
  name: '',
  statusMessage: '',
};

const SignUpUserMutation = graphql`
  mutation SignUpMutation(
    $email: String!
    $password: String!
    $name: String
    $statusMessage: String
  ) {
    signUp(
      user: {
        email: $email
        password: $password
        name: $name
        statusMessage: $statusMessage
      }
    ) {
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

function isValidate(type, value): boolean {
  const emailRegex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
  switch (type) {
    case 'email':
      return emailRegex.test(String(value).toLowerCase());

    default:
      return false;
  }
}

const SignUp: FC<Props> = ({ navigation }) => {
  const { setUser } = useAppContext();
  const [state, setState] = React.useState<State>(initialState);
  const [confirmPassword, setConfirmPassword] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');

  const [isContinue, setContinue] = React.useState<boolean>(false);

  const [commit, isInFlight] = useMutation<SignUpMutation>(SignUpUserMutation);

  const mutationConfig = {
    variables: {
      ...state,
    },
    onCompleted: (response: SignUpMutationResponse): void => {
      const { token, user } = response.signUp;
      AsyncStorage.setItem('@UserStorage:login_token', token)
        .then(() => {
          setUser({
            ...user,
          });
        })
        .catch((e) => console.error(e));
    },
    onError: (error): void => {
      console.error(error);
      setError('Network error');
    },
  };

  const handleSubmit = (): void => {
    commit(mutationConfig);
  };

  const handleCancel = (): void => {
    navigation.goBack();
  };

  React.useEffect(() => {
    if (
      !isValidate('email', state.email) ||
      !state.password ||
      state.password !== confirmPassword
    ) {
      setContinue(false);
      setError('Check input fields');
    } else {
      setContinue(true);
    }
  }, [state, confirmPassword]);

  return (
    <Container>
      <StyledTextInput
        value={state.email}
        onChangeText={(value: string): void =>
          setState({ ...state, email: value })
        }
        textContentType="emailAddress"
        placeholder="email"
      />
      <StyledTextInput
        value={state.password}
        onChangeText={(value: string): void =>
          setState({ ...state, password: value })
        }
        textContentType="password"
        secureTextEntry={true}
        placeholder="Password"
      />
      <StyledTextInput
        value={confirmPassword}
        onChangeText={(value: string): void => setConfirmPassword(value)}
        textContentType="password"
        secureTextEntry={true}
        placeholder="Confirm password"
      />
      <StyledTextInput
        value={state.name}
        onChangeText={(value: string): void =>
          setState({ ...state, name: value })
        }
        placeholder="Name"
      />
      <StyledTextInput
        value={state.statusMessage}
        onChangeText={(value: string): void =>
          setState({ ...state, statusMessage: value })
        }
        placeholder="Status message"
      />
      <ErrorMessage>{error}</ErrorMessage>
      <Button
        testID="btn-back"
        onClick={handleSubmit}
        text={'Sign up'}
        isLoading={isInFlight}
        isDisabled={!isContinue}
      />
      <Button testID="btn-back" onClick={handleCancel} text={'Cancel'} />
    </Container>
  );
};

export default SignUp;
