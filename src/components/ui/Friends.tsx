import type {
  FriendsQuery,
  FriendsQueryResponse,
} from '__generated__/FriendsQuery.graphql';
import React, { FC } from 'react';
import {
  graphql,
  preloadQuery,
  usePreloadedQuery,
  useRelayEnvironment,
} from 'react-relay/hooks';
import Friend from '../shared/Friend';
import Relay from '../../relay';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: transparent;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const HeaderTitle = styled.Text`
  color: ${({ theme }): string => theme.fontColor};
  font-size: 25px;
  font-weight: 600;
  padding-top: 15px;
  padding-bottom: 15px;
`;

const StyledList = styled.View``;

const StyledMessage = styled.Text`
  color: ${({ theme }): string => theme.tintColor};
  width: 320px;
  height: 20px;
  text-align: center;
  margin-bottom: 10px;
  font-style: italic;
`;

const FriendQuery = graphql`
  query FriendsQuery {
    friends {
      ...Friend_user
    }
  }
`;

const Friends: FC = () => {
  const environment = useRelayEnvironment();
  const result = preloadQuery<FriendsQuery>(
    environment,
    FriendQuery,
    {},
    { fetchPolicy: 'store-or-network' },
  );

  const { friends }: FriendsQueryResponse = usePreloadedQuery<FriendsQuery>(
    FriendQuery,
    result,
  );

  console.log('Friends rendering', friends, environment.configName);

  return (
    <Container>
      <HeaderTitle>Friends list</HeaderTitle>
      <StyledList>
        {friends.length > 0 ? (
          friends.map((friend, idx) => (
            <Friend key={`friend__${idx}`} user={friend} />
          ))
        ) : (
          <StyledMessage>Empty list</StyledMessage>
        )}
      </StyledList>
    </Container>
  );
};

export default Friends;
