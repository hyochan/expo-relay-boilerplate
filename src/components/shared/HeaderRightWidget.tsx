import type {
  HeaderRightWidgetUserQuery,
  HeaderRightWidgetUserQueryResponse,
} from './__generated__/HeaderRightWidgetUserQuery.graphql';
import { graphql, preloadQuery, usePreloadedQuery } from 'react-relay/hooks';
import Avatar from '../shared/Avatar';
import React from 'react';
import environment from '../../relay/RelayEnvironment';

import styled from 'styled-components/native';

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
  const result = preloadQuery(
    environment,
    UserQuery,
    {},
    { fetchPolicy: 'store-or-network' },
  );
  const data: HeaderRightWidgetUserQueryResponse = usePreloadedQuery<
    HeaderRightWidgetUserQuery
  >(UserQuery, result);

  return (
    <HeaderRightContainer>
      <React.Suspense fallback={'loading...'}>
        <Avatar photoURL={data.me?.photoURL} onPress={(): null => null} />
        <StyledText>{data.me?.name}</StyledText>
      </React.Suspense>
    </HeaderRightContainer>
  );
}

HeaderRightWidget.displayName = 'HeaderRightWidget';

export default HeaderRightWidget;
