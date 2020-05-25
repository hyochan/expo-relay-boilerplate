import React, { ReactElement } from 'react';

import { DrawerNavigationProps } from '../navigation/HomeStackNavigator';
import Header from '../shared/Header';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: transparent;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StyledText = styled.Text`
  font-size: 16px;
  color: blue;
`;

interface Props {
  navigation: DrawerNavigationProps<'Temp'>;
}

const Page = (props: Props): ReactElement => {
  return (
    <Container>
      <Header {...props} />
      <StyledText testID="myText">dooboolab</StyledText>
    </Container>
  );
};

export default Page;
