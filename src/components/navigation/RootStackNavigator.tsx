import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';

import AuthStack from './AuthStackNavigator';
import MainStack from './MainStackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useAuthContext } from '../../providers/AuthProvider';
import { useThemeContext } from '../../providers/ThemeProvider';

export type RootStackParamList = {
  default: undefined;
  Main: undefined;
  Auth: undefined;
};

export type RootStackNavigationProps<
  T extends keyof RootStackParamList = 'default'
> = StackNavigationProp<RootStackParamList, T>;

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator(): React.ReactElement {
  const { theme } = useThemeContext();
  const { state } = useAuthContext();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={state.user ? 'Main' : 'Auth'}
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.background,
          },
          headerTitleStyle: { color: theme.fontColor },
          headerTintColor: theme.tintColor,
        }}
        headerMode="none"
      >
        {state.user ? (
          <Stack.Screen name="Main" component={MainStack} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
