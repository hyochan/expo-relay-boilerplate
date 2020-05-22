import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import { ThemeType, useThemeContext } from '../../providers/ThemeProvider';
import HeaderRightWidget from '../shared/HeaderRightWidget';
import Home from '../screen/Home';
import React from 'react';

export type MainStackParamList = {
  default: undefined;
  Home: undefined;
};

export type RootStackNavigationProps<
  T extends keyof MainStackParamList = 'default'
> = StackNavigationProp<MainStackParamList, T>;

const Stack = createStackNavigator<MainStackParamList>();

function MainStackNavigator(): React.ReactElement {
  const { theme, themeType } = useThemeContext();

  return (
    <Stack.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTitleStyle: { color: theme.fontColor },
        headerTintColor: theme.tintColor,
      }}
      headerMode={themeType === ThemeType.DARK ? 'screen' : 'float'}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerRight: (): React.ReactElement => <HeaderRightWidget />,
        }}
      />
    </Stack.Navigator>
  );
}

export default MainStackNavigator;
