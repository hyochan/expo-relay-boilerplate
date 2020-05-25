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
  console.log('render HeaderRightWidget');
  // const user = {};
  const resetUser = () => null;
  // const {
  //   state: { user },
  //   resetUser,
  // } = useAppContext();

  const result = preloadQuery(
    environment,
    UserQuery,
    {},
    { fetchPolicy: 'network-only' },
  );

  const { me }: HeaderRightWidgetUserQueryResponse = usePreloadedQuery<
    HeaderRightWidgetUserQuery
  >(UserQuery, result);

  return (
    <HeaderRightContainer>
      <React.Suspense fallback={'loading...'}>
        <Avatar photoURL={me?.photoURL} onPress={resetUser} />
        <StyledText>{me?.name}</StyledText>
      </React.Suspense>
    </HeaderRightContainer>
  );
}

HeaderRightWidget.displayName = 'HeaderRightWidget';

export default HeaderRightWidget;
