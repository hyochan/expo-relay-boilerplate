import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerNavigationProp,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import React, { ReactElement } from 'react';
import Home from '../screen/Home';
import Temp from '../screen/Temp';

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
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

function MainStackNavigator(): ReactElement {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerType="permanent"
      drawerContent={(props: DrawerContentComponentProps): ReactElement => (
        <CustomDrawerContent {...props} />
      )}
      drawerStyle={{}}
      overlayColor="transparent"
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Temp" component={Temp} />
    </Drawer.Navigator>
  );
}

export default MainStackNavigator;
