import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';

import React from 'react';
import SignIn from '../screen/SignIn';
import SignUp from '../screen/SignUp';
import { useThemeContext } from '../../providers/ThemeProvider';

export type AuthStackParamList = {
  default: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

export type AuthStackNavigationProps<
  T extends keyof AuthStackParamList = 'default'
> = StackNavigationProp<AuthStackParamList, T>;

const Stack = createStackNavigator<AuthStackParamList>();

function AuthNavigator(): React.ReactElement {
  const { theme } = useThemeContext();

  React.useEffect(() => {
    return (): void => {
      console.log('Unmount AuthStack');
    };
  }, []);

  return (
    <Stack.Navigator
      initialRouteName={'SignIn'}
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTitleStyle: { color: theme.fontColor },
        headerTintColor: theme.tintColor,
      }}
      headerMode="none"
    >
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
