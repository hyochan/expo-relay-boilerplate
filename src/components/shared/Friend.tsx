import React, { FC } from 'react';
import Avatar from './Avatar';
import styled from 'styled-components/native';

export type FriendProps = {
  readonly id: string;
  readonly email: string | null;
  readonly name: string | null;
  readonly photoURL: string | null;
};

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

const Friend: FC<FriendProps> = ({ id, email, name, photoURL }) => {
  const [online, setOnline] = React.useState<boolean>(false);

  return (
    <Container>
      <Avatar photoURL={photoURL} />
      <Text>{name}</Text>
      <StatusDot online={online} />
    </Container>
  );
};

export default Friend;
