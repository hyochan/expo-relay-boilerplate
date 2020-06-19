import { AppLoading, Asset } from 'expo';
import React, { useEffect, useState } from 'react';
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
import Relay from './relay';
import RootNavigator from './components/navigation/RootStackNavigator';
import RootProvider from './providers';
import SuspenseScreen from './components/screen/Suspense';
import { useAuthContext } from './providers/AuthProvider';

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
  const userFetchResult = preloadQuery<AppUserQuery>(
    Relay.environment,
    UserQuery,
    {},
    { fetchPolicy: 'store-and-network' },
  );
  const userData = usePreloadedQuery<AppUserQuery>(UserQuery, userFetchResult);

  const { setUser } = useAuthContext();

  useEffect(() => {
    if (userData.me) {
      setUser({
        ...userData.me,
      });
    }
  }, [userData.me]);

  return <RootNavigator />;
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
      <RelayEnvironmentProvider environment={Relay.environment}>
        <ErrorBoundary fallback={<SuspenseScreen error />}>
          <React.Suspense fallback={<SuspenseScreen />}>
            <App />
          </React.Suspense>
        </ErrorBoundary>
      </RelayEnvironmentProvider>
    </RootProvider>
  );
}

export default ProviderWrapper;
