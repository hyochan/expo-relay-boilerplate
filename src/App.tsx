import { AppLoading, Asset } from 'expo';
import type {
  AppUserQuery,
  AppUserQueryResponse,
} from './__generated__/AppUserQuery.graphql';
import React, { useEffect, useState } from 'react';

import {
  RelayEnvironmentProvider,
  graphql,
  preloadQuery,
  usePreloadedQuery,
} from 'react-relay/hooks';
import Icons from './utils/Icons';
import { Image } from 'react-native';
import RelayEnvironment from './relay/RelayEnvironment';
import RootNavigator from './components/navigation/RootStackNavigator';
import RootProvider from './providers';
import { useAppContext } from './providers/AppProvider';

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

const userFetchResult = preloadQuery(
  RelayEnvironment,
  UserQuery,
  {},
  { fetchPolicy: 'store-or-network' },
);

function App(): React.ReactElement {
  const userData: AppUserQueryResponse = usePreloadedQuery<AppUserQuery>(
    UserQuery,
    userFetchResult,
  );

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

function ProviderWrapper(): React.ReactElement {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <AppLoading
        startAsync={loadAssetsAsync}
        onFinish={(): void => setLoading(true)}
        // onError={console.warn}
      />
    );
  }
  return (
    <RootProvider>
      <RelayEnvironmentProvider environment={RelayEnvironment}>
        <React.Suspense fallback={'App fallback...'}>
          <App />
        </React.Suspense>
      </RelayEnvironmentProvider>
    </RootProvider>
  );
}

export default ProviderWrapper;
