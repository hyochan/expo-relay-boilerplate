import {
  DrawerContentComponentProps,
  DrawerNavigationProp,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import React, { ReactElement } from 'react';
import DrawerContent from '../shared/DrawerContent';
import Home from '../screen/Home';
import Temp from '../screen/Temp';
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

function MainStackNavigator(): ReactElement {
  const { theme } = useThemeContext();
  const [isOpen, setOpen] = React.useState<boolean>(true);
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerType="permanent"
      drawerContent={(props: DrawerContentComponentProps): ReactElement => (
        <DrawerContent {...props} isOpen={isOpen} setOpen={setOpen} />
      )}
      drawerStyle={{
        backgroundColor: theme.background,
        width: isOpen ? 320 : 60,
        borderRightWidth: 0,
      }}
      overlayColor="transparent"
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Temp" component={Temp} />
    </Drawer.Navigator>
  );
}

export default MainStackNavigator;
