import React, { FC } from 'react';
import { graphql, useFragment } from 'react-relay/hooks';
import Avatar from './Avatar';
import type { Friend_user$key } from './__generated__/Friend_user.graphql';
import styled from 'styled-components/native';

const Container = styled.View`
  position: relative;
  width: 300px;
  min-height: 60px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-bottom: 5px;
  background-color: #ddd;
  border-radius: 5px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const StatusDot = styled.View`
  position: absolute;
  top: calc(50% - 7.5px);
  right: 10px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${(props): string =>
    props.online ? '#13AB55' : '#E65C5C'};
`;

const Text = styled.Text`
  margin-left: 15px;
`;

export type Props = {
  user: Friend_user$key;
};

const Friend: FC<Props> = (props) => {
  const [online, setOnline] = React.useState<boolean>(false);

  const data = useFragment(
    graphql`
      fragment Friend_user on User {
        name
        photoURL
      }
    `,
    props.user,
  );

  return (
    <Container>
      <Avatar photoURL={data.photoURL} />
      <Text>{data.name}</Text>
      <StatusDot online={online} />
    </Container>
  );
};

export default Friend;
