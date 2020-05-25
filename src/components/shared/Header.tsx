import React, { ReactElement } from 'react';

import { DrawerNavigationProps } from '../navigation/HomeStackNavigator';
import HeaderRightWidget from '../shared/HeaderRightWidget';
import styled from 'styled-components/native';

interface Props {
  navigation: DrawerNavigationProps<'Home' | 'Temp'>;
}

const Container = styled.View`
  position: absolute;
  top: 0;
  width: 100%;
  height: 60px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: ${({ theme }): string => theme.background};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const MenuContainer = styled.TouchableOpacity`
  padding-left: 20px;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const Menu = styled.Text`
  color: ${({ theme }): string => theme.fontColor};
  font-size: 18px;
  font-weight: 600;
`;

const Header = (props: Props): ReactElement => {
  return (
    <Container>
      <MenuContainer onPress={(): void => props.navigation.toggleDrawer()}>
        <Menu>Menu</Menu>
      </MenuContainer>
      <HeaderRightWidget />
    </Container>
  );
};

export default Header;
