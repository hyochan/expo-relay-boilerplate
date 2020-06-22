import { AppLoading, Asset } from 'expo';
import React, { ReactElement, Suspense, useEffect, useState } from 'react';
import {
  RelayEnvironmentProvider,
  graphql,
  preloadQuery,
  usePreloadedQuery,
  useRelayEnvironment,
} from 'react-relay/hooks';

import type { AppUserQuery } from '__generated__/AppUserQuery.graphql';
import ErrorBoundary from './ErrorBoundary';

import Icons from './utils/Icons';
import { Image } from 'react-native';
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

const AppUser = graphql`
  query AppUserQuery {
    me {
      id
      email
      name
      photoURL
    }
  }
`;

function App(): ReactElement {
  const AppUserResult = preloadQuery<AppUserQuery>(
    useRelayEnvironment(),
    AppUser,
    {},
    { fetchPolicy: 'store-or-network' },
  );
  const { me } = usePreloadedQuery<AppUserQuery>(AppUser, AppUserResult);

  const { setUser } = useAuthContext();

  useEffect(() => {
    if (me) {
      setUser({
        ...me,
      });
    }
  }, [me]);

  return <RootNavigator />;
}

function RelayEnvironmentWrapper({ children }): ReactElement {
  const {
    state: { relay },
  } = useAuthContext();
  return (
    <RelayEnvironmentProvider environment={relay}>
      <ErrorBoundary fallback={<SuspenseScreen error />}>
        <Suspense fallback={<SuspenseScreen />}>{children}</Suspense>
      </ErrorBoundary>
    </RelayEnvironmentProvider>
  );
}

function ProviderWrapper(): ReactElement {
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
      <RelayEnvironmentWrapper>
        <App />
      </RelayEnvironmentWrapper>
    </RootProvider>
  );
}

export default ProviderWrapper;
