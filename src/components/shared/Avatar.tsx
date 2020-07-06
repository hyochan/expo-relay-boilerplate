import React, { FC } from 'react';
import styled, { css } from 'styled-components/native';

import Constants from 'expo-constants';

interface Props {
  photoURL: string | undefined | null;
  onPress?: () => void | null;
}

const Container = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-left: 5px;
  margin-right: 5px;
  ${Constants.platform?.web &&
  css`
    cursor: ${(props: Props): string =>
      props.onPress ? 'pointer' : 'initial'};
  `};
`;
const StyledImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 25px;
`;

export default function Avatar(props: Props): React.ReactElement {
  return (
    <Container
      activeOpacity={props.onPress ? 0.8 : 1}
      onPress={props.onPress ? props.onPress : null}
    >
      <StyledImage
        source={{
          uri:
            props.photoURL ||
            'https://avatars2.githubusercontent.com/u/45788556?s=200&v=4',
        }}
      />
    </Container>
  );
}
