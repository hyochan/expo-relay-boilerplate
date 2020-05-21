import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import { ThemeType, useThemeContext } from '../../providers/ThemeProvider';
import Home from '../screen/Home';
import Profile from '../screen/Profile';
import React from 'react';
import styled from 'styled-components/native';

export type MainStackParamList = {
  default: undefined;
  Home: undefined;
};

export type RootStackNavigationProps<
  T extends keyof MainStackParamList = 'default'
> = StackNavigationProp<MainStackParamList, T>;

const HeaderRightContainer = styled.View`
  width: 100px;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
const ProfileImageWrapper = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
const StyledImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

function HeaderRightWidget(): React.ReactElement {
  return (
    <HeaderRightContainer>
      <ProfileImageWrapper activeOpacity={0.8}>
        <StyledImage
          source={{
            uri: 'https://avatars2.githubusercontent.com/u/45788556?s=200&v=4',
          }}
        />
      </ProfileImageWrapper>
    </HeaderRightContainer>
  );
}

HeaderRightWidget.displayName = 'HeaderRightWidget';

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
