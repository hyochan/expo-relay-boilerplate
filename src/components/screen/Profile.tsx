import React, { FC } from 'react';
import { graphql, preloadQuery, usePreloadedQuery } from 'react-relay/hooks';
import type { ProfileUserQuery } from './__generated__/ProfileUserQuery.graphql';
import RelayEnvironment from '../../relay/RelayEnvironment';
import { RootStackNavigationProps } from '../navigation/RootStackNavigator';
import styled from 'styled-components/native';
import { useAppContext } from '../../providers/AppProvider';

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
  navigation: RootStackNavigationProps<'Profile'>;
}

// Define a query
const UserQuery = graphql`
  query ProfileUserQuery($id: ID!) {
    user(id: $id) {
      id
      email
    }
  }
`;

const Profile: FC = (props: any): React.ReactElement => {
  const {
    state: { user },
  } = useAppContext();

  const result = preloadQuery(
    RelayEnvironment,
    UserQuery,
    { id: user?.id },
    { fetchPolicy: 'store-or-network' },
  );
  const data = usePreloadedQuery<ProfileUserQuery>(UserQuery, result);
  return (
    <Container>
      <React.Suspense fallback={'Profile fallback...'}>
        <StyledText>{data.user.email}</StyledText>
      </React.Suspense>
    </Container>
  );
};

export default Profile;
