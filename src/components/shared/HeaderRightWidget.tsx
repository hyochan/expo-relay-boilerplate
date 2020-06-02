/* eslint-disable @typescript-eslint/camelcase */
import { graphql, useFragment } from 'react-relay/hooks';
import Avatar from '../shared/Avatar';
import type { HeaderRightWidget_user$key } from './__generated__/HeaderRightWidget_user.graphql';
import React from 'react';

import styled from 'styled-components/native';
import { useAppContext } from '../../providers/AppProvider';

type Props = {
  user: HeaderRightWidget_user$key;
};

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

function HeaderRightWidget(props: Props): React.ReactElement {
  const { resetUser } = useAppContext();
  const handleSignOut = (): void => {
    resetUser();
  };

  const data = useFragment(
    graphql`
      fragment HeaderRightWidget_user on User {
        id
        email
        name
        photoURL
      }
    `,
    props.user,
  );

  return (
    <HeaderRightContainer>
      <Avatar photoURL={data.photoURL} onPress={handleSignOut} />
      <StyledText>{data.name}</StyledText>
    </HeaderRightContainer>
  );
}

HeaderRightWidget.displayName = 'HeaderRightWidget';

export default HeaderRightWidget;
