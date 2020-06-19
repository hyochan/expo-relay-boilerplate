import { Animated, Text } from 'react-native';
import React, { useMemo } from 'react';
import { graphql, useSubscription } from 'relay-hooks';

import { DrawerNavigationProps } from '../navigation/MainStackNavigator';
import Friends from '../ui/Friends';
import Header from '../shared/Header';
import { RecordSourceSelectorProxy } from 'relay-runtime';
import styled from 'styled-components/native';
import { useAuthContext } from '../../providers/AuthProvider';

const Container = styled.View`
  position: relative;
  flex: 1;
  align-self: stretch;
  overflow: scroll;
  background-color: ${({ theme }): string => theme.background};

  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
`;

interface Props {
  navigation: DrawerNavigationProps<'Home'>;
}

const subscriptionSpec = graphql`
  subscription HomeUserSubscription($userId: ID!) {
    userSignedIn(userId: $userId) {
      id
      email
    }
  }
`;

function Home(props: Props): React.ReactElement {
  const [signin, setSignin] = React.useState<boolean>(false);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const {
    state: { user },
  } = useAuthContext();

  useSubscription(
    useMemo(() => {
      return {
        variables: { userId: user?.id },
        subscription: subscriptionSpec,
        onCompleted: (): void =>
          console.log('[Home] subscription is now closed.'),
        updater: (
          store: RecordSourceSelectorProxy<unknown>,
          data: unknown,
        ): void => {
          if (data) {
            setSignin(true);
          }
        },
      };
    }, [user]),
  );

  React.useEffect((): void => {
    const fadeIn = (): void => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => setSignin(false), 2000);
      });
    };

    const fadeOut = (): void => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    };

    signin ? fadeIn() : fadeOut();
  }, [signin]);

  return (
    <Container>
      <React.Suspense fallback={'Home fallback...'}>
        <Header {...props} />
        <Friends />
        <Animated.View
          style={{
            position: 'absolute',
            top: 5,
            paddingVertical: 8,
            paddingHorizontal: 16,
            backgroundColor: '#00FACB',
            opacity: fadeAnim,
          }}
        >
          <Text>A new device has signed in</Text>
        </Animated.View>
      </React.Suspense>
    </Container>
  );
}

export default Home;
