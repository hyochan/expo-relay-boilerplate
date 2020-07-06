import React, { FC } from 'react';

import Avatar from './Avatar';
import styled from 'styled-components/native';
import { useAuthContext } from '../../providers/AuthProvider';

const HeaderRightContainer = styled.View`
  width: 150px;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background-color: transparent;
`;
const StyledText = styled.Text`
  padding-left: 5px;
  color: ${({ theme }): string => theme.fontColor};
`;

const HeaderRightWidget: FC = () => {
  const {
    state: { user },
    resetUser,
  } = useAuthContext();

  const handleSignOut = (): void => {
    resetUser();
  };

  return (
    <HeaderRightContainer>
      <Avatar photoURL={user?.photoURL} onPress={handleSignOut} />
      <StyledText>{user?.name || 'no-name'}</StyledText>
    </HeaderRightContainer>
  );
};

HeaderRightWidget.displayName = 'HeaderRightWidget';

export default HeaderRightWidget;
