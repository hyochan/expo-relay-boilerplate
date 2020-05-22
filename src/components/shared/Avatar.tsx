import React, { FC } from 'react';

import styled from 'styled-components/native';

const Container = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-left: 5px;
  margin-right: 5px;
`;
const StyledImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

export default function Avatar({ photoURL }): React.ReactElement {
  return (
    <Container activeOpacity={0.8}>
      <StyledImage
        source={{
          uri:
            photoURL ||
            'https://avatars2.githubusercontent.com/u/45788556?s=200&v=4',
        }}
      />
    </Container>
  );
}
