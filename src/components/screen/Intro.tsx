import Button from '../shared/Button';
import { IC_MASK } from '../../utils/Icons';
import React from 'react';
import { RootStackNavigationProps } from '../navigation/RootStackNavigator';
import { User } from '../../types';
import { View } from 'react-native';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';
import { useAppContext } from '../../providers/AppProvider';
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

const ContentWrapper = styled.View`
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
`;

const ButtonWrapper = styled.View`
  position: absolute;
  flex-direction: column;
  bottom: 40px;
  width: 85%;
  align-self: center;
`;

const StyledTextInput = styled.TextInput`
  width: 90%;
  height: 40px;
  align-self: center;
  border-width: 1.3px;
  border-color: lightgray;
  border-radius: 3px;
  padding: 10px;
  margin-bottom: 5px;
  color: ${({ theme }): string => theme.fontColor};
`;

interface Props {
  navigation: RootStackNavigationProps<'Profile'>;
}

function Intro(props: Props): React.ReactElement {
  const {
    state: { user },
    setUser,
  } = useAppContext();
  const { changeThemeType } = useThemeContext();
  const [isLoggingIn, setIsLoggingIn] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>('');
  const [passwd, setPasswd] = React.useState<string>('');

  return (
    <Container>
      <ButtonWrapper>
        <StyledTextInput
          value={email}
          onChangeText={(value: string): void => setEmail(value)}
          textContentType="emailAddress"
          placeholder="dd"
        />
        <StyledTextInput
          value={passwd}
          onChangeText={(value: string): void => setPasswd(value)}
          textContentType="password"
          secureTextEntry={true}
          placeholder="Password"
        />
        <Button
          testID="btn-login"
          imgLeftSrc={IC_MASK}
          isLoading={isLoggingIn}
          onClick={(): void =>
            props.navigation.navigate('Profile')
          }
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
    </Container>
  );
}

export default Intro;
