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
  width: 100px;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const UserQuery = graphql`
  query HeaderRightWidgetUserQuery($id: ID!) {
    user(id: $id) {
      name
      photoURL
    }
  }
`;

function HeaderRightWidget(): React.ReactElement {
  const {
    state: { user },
  } = useAppContext();

  const result = preloadQuery(
    environment,
    UserQuery,
    { id: user?.id },
    { fetchPolicy: 'store-or-network' },
  );
  const data: HeaderRightWidgetUserQueryResponse = usePreloadedQuery<
    HeaderRightWidgetUserQuery
  >(UserQuery, result);

  return (
    <HeaderRightContainer>
      <React.Suspense fallback={'loading...'}>
        <Avatar photoURL={data.user?.photoURL} />
      </React.Suspense>
    </HeaderRightContainer>
  );
}

HeaderRightWidget.displayName = 'HeaderRightWidget';

export default HeaderRightWidget;
