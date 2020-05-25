import React, { FC } from 'react';
import Friend from '../shared/Friend';
import type { HomeFriendQueryResponse } from '../screen/__generated__/HomeFriendQuery.graphql';
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

export interface FriendsProps {
  data: HomeFriendQueryResponse;
}

const Friends: FC<FriendsProps> = ({ data }) => {
  return (
    <Container>
      <HeaderTitle>Friends list</HeaderTitle>
      <StyledList>
        {data.friends.length > 0 ? (
          data.friends.map((friend) => <Friend key={friend.id} {...friend} />)
        ) : (
          <StyledMessage>Empty list</StyledMessage>
        )}
      </StyledList>
    </Container>
  );
};

export default Friends;
