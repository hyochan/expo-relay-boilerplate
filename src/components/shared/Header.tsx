import React, { ReactElement } from 'react';

import { DrawerNavigationProps } from '../navigation/MainStackNavigator';
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
  justify-content: flex-end;
`;

const Header = (props: Props): ReactElement => {
  return (
    <Container>
      <HeaderRightWidget />
    </Container>
  );
};

export default Header;
