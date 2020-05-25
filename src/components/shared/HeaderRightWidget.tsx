import type {
  HeaderRightWidgetUserQuery,
  HeaderRightWidgetUserQueryResponse,
} from './__generated__/HeaderRightWidgetUserQuery.graphql';
import { graphql, preloadQuery, usePreloadedQuery } from 'react-relay/hooks';
import Avatar from '../shared/Avatar';
import React from 'react';
import environment from '../../relay/RelayEnvironment';

import styled from 'styled-components/native';
import { useAppContext } from '../../providers/AppProvider';

const HeaderRightContainer = styled.View`
  width: 150px;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;
const StyledText = styled.Text`
  padding-left: 5px;
`;

const UserQuery = graphql`
  query HeaderRightWidgetUserQuery {
    me {
      id
      name
      photoURL
    }
  }
`;

function HeaderRightWidget(): React.ReactElement {
  const { resetUser } = useAppContext();
  const result = preloadQuery(
    environment,
    UserQuery,
    {},
    { fetchPolicy: 'store-and-network' },
  );

  const { me }: HeaderRightWidgetUserQueryResponse = usePreloadedQuery<
    HeaderRightWidgetUserQuery
  >(UserQuery, result);

  const handleSignOut = (): void => {
    resetUser();
  };

  return (
    <HeaderRightContainer>
      <React.Suspense fallback={'loading...'}>
        <Avatar photoURL={me?.photoURL} onPress={handleSignOut} />
        <StyledText>{me?.name}</StyledText>
      </React.Suspense>
    </HeaderRightContainer>
  );
}

HeaderRightWidget.displayName = 'HeaderRightWidget';

export default HeaderRightWidget;
