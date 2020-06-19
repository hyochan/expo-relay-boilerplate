import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  DrawerNavigationProp,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import React, { ReactElement } from 'react';
import Home from '../screen/Home';
import Temp from '../screen/Temp';
import styled from 'styled-components/native';
import { useAuthContext } from '../../providers/AuthProvider';
import { useThemeContext } from '../../providers/ThemeProvider';

export type DrawerParamList = {
  default: undefined;
  Home: undefined;
  Temp: undefined;
};

export type DrawerNavigationProps<
  T extends keyof DrawerParamList = 'default'
> = DrawerNavigationProp<DrawerParamList, T>;

const Drawer = createDrawerNavigator<DrawerParamList>();

function CustomDrawerContent(props): ReactElement {
  const { changeThemeType, theme } = useThemeContext();
  const { resetUser } = useAuthContext();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Change theme"
        onPress={changeThemeType}
        style={{
          backgroundColor: theme.btnPrimary,
        }}
      />
      <DrawerItem
        label="Sign out"
        onPress={resetUser}
        style={{
          backgroundColor: theme.btnPrimary,
        }}
      />
    </DrawerContentScrollView>
  );
}

function MainStackNavigator(): ReactElement {
  const { theme } = useThemeContext();

  React.useEffect(() => {
    return (): void => {
      console.log('[MainStack] unmounted');
    };
  }, []);

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerType="slide"
      drawerContent={(props: DrawerContentComponentProps): ReactElement => (
        <CustomDrawerContent {...props} />
      )}
      drawerStyle={{ backgroundColor: theme.background }}
      overlayColor="transparent"
    >
      <Drawer.Screen name="Home" component={Home} />
      {/* <Drawer.Screen name="Temp" component={Temp} /> */}
    </Drawer.Navigator>
  );
}

export default MainStackNavigator;
