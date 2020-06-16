import { AppLoading, Asset } from 'expo';
import React, { ReactElement, useEffect, useState } from 'react';
import {
  RelayEnvironmentProvider,
  graphql,
  preloadQuery,
  usePreloadedQuery,
  useRelayEnvironment,
} from 'react-relay/hooks';

import type { AppUserQuery } from './__generated__/AppUserQuery.graphql';

import ErrorBoundary from './ErrorBoundary';
import Icons from './utils/Icons';
import { Image } from 'react-native';
import RootNavigator from './components/navigation/RootStackNavigator';
import RootProvider from './providers';
import styled from 'styled-components/native';
import { useAppContext } from './providers/AppProvider';

const SuspenseAppContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: red;
`;

const StyledSuspenseText = styled.Text`
  font-size: 30px;
  font-weight: 600;
  color: #fff;
`;

function LoadingSpinner(): React.ReactElement {
  return (
    <SuspenseAppContainer>
      <StyledSuspenseText>Suspense!</StyledSuspenseText>
    </SuspenseAppContainer>
  );
}

function cacheImages(images: Image[]): Image[] {
  return images.map((image: Image) => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

const loadAssetsAsync = async (): Promise<void> => {
  const imageAssets = cacheImages(Icons);
  await Promise.all([...imageAssets]);
};

const UserQuery = graphql`
  query AppUserQuery {
    me {
      id
      email
      name
      photoURL
    }
  }
`;

function App(): React.ReactElement {
  const environment = useRelayEnvironment();
  const userFetchResult = preloadQuery<AppUserQuery>(
    environment,
    UserQuery,
    {},
    { fetchPolicy: 'store-or-network' },
  );
  const userData = usePreloadedQuery<AppUserQuery>(UserQuery, userFetchResult);

  const { setUser } = useAppContext();

  useEffect(() => {
    if (userData.me) {
      setUser({
        ...userData.me,
      });
    }
  }, [userData.me]);

  return <RootNavigator />;
}

function RelayProviderWrapper(): ReactElement {
  const {
    state: { relay },
  } = useAppContext();

  return (
    <RelayEnvironmentProvider environment={relay}>
      <ErrorBoundary>
        <React.Suspense fallback={<LoadingSpinner />}>
          <App />
        </React.Suspense>
      </ErrorBoundary>
    </RelayEnvironmentProvider>
  );
}

function ProviderWrapper(): React.ReactElement {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <AppLoading
        startAsync={loadAssetsAsync}
        onFinish={(): void => setLoading(true)}
      />
    );
  }
  return (
    <RootProvider>
      <RelayProviderWrapper />
    </RootProvider>
  );
}

export default ProviderWrapper;
