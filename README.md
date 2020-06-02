# expo-relay-boilerplate

## Motivation

At React Conf 2019, React team have been announced experimental release version of React that supports [Concurrent mode and Suspense](https://reactjs.org/docs/concurrent-mode-intro.html). Because of this pattern is based on [Relay](https://relay.dev/en/), I also did research and practice for Relay.

I introduce what I've practiced and provide this for easy start. **Especially**, For this is made with expo-web, It can be support universal layout.

## Basic Concept

`React` breaks complex interfaces into **reusable** components reducing the coupling between desperate part of an application. And React components is **declarative**.

**BUT** previous data fetching approach *(like REST)* doesn't take any advantages of React's component model. We needed a way to determine all the data needs up-front or statically.

`Relay` provides that components can specify one or multiple fragments for their data dependencies. Each of fragment has unique name within an application which allows us to determine what data needed to fetch and load all the required data in a single network request efficiently at runtime.

## Environment

```
node: 12.16.3
yarn: 1.22.4
dooboo-cli: 3.4.5
watchman: 4.9.0
```

## Structure

```
app/
├─ .dooboo // necessary if using dooboo-cli
├─ .expo
├─ assets
├─ node_modules/
├─ src/
│  └─ __generated__ // static queries by relay compiler
│  └─ apis
│  └─ components
│     └─ navigations
│     └─ screen
│     └─ shared
│     └─ ui
│  └─ providers
│  └─ relay // relay runtime environment
│  └─ types
│  └─ utils
│  └─ App.tsx
│  └─ styled.d.ts
│  └─ theme.ts
├─ test/
├─ .eslintrc.js
├─ .gitignore
├─ .ncurc.json
├─ .prettierrc.js
├─ .watchmanconfig
├─ app.json
├─ App.tsx
├─ babel.config.js
├─ codecov.yml
├─ environment.d.ts
├─ jest.config.js
├─ LICENSE
├─ package.json
├─ README.md
├─ relay.config.js  // relay configuration options
├─ schema.graphql   // graphql schema from the server
├─ STRINGS.ts
├─ tsconfig.jest.json
├─ tsconfig.json
└─ yarn.lock
```

## Getting started

```bash
git clone https://github.com/devethan/expo-relay.git
cd expo-relay/

yarn
yarn start --web
```

## Usage

### Configure relay runtime env

The Relay env bundles together the configuration, cache storage, and network-handling that Relay needs in order to operate. And then relay runtime combines component with `graphql`.

In order to render Relay components, you need to render a `RelayEnvironmentProvider` component at the root of the app.

```tsx
// App root
const {RelayEnvironmentProvider} = require('react-relay/hooks');
import RelayEnvironment from './relay/RelayEnvironment';

function ProviderWrapper(): React.ReactElement {
  return (
    <RootProvider>
      <RelayEnvironmentProvider environment={RelayEnvironment}>
				{...}
      </RelayEnvironmentProvider>
    </RootProvider>
  );
}
```

then we can available all descendant Relay components and relevant functions.

Below is Relay runtime env what I've setup.

```tsx
function fetchFunction(
  request: RequestParameters,
  variables: Variables,
  cacheConfig: CacheConfig,
): Promise<GraphQLResponse> {
  return AsyncStorage.getItem('@UserStorage:login_token').then((token) => {
    return fetchGraphQL(request, variables, cacheConfig, token);
  });
};

function subscribeFunction(
  request: RequestParameters,
  variables: Variables,
  cacheConfig: CacheConfig,
): SubscribeFunction {
  return subscribeGraphQL(request, variables, cacheConfig);
};

export default new Environment({
  network: Network.create(fetchFunction, subscribeFunction),
  store: new Store(new RecordSource()),
});
```

### React.Suspense

Suspense lets your components wait for something before they can render.

```tsx
import ErrorBoundary from '../';
<RelayEnvironmentProvider environment={RelayEnvironment}>
  <ErrorBoundary fallback={<h2>Could not fetch data.</h2>}>
    <React.Suspense fallback={<LoadingSpinner />}>
      <App />
    </React.Suspense>
  </ErrorBoundary>
</RelayEnvironmentProvider>
```

With Suspense, we also handling fetching errors works the same way as handling rendering errors with define `<ErrorBoundary>`

### useFragment

You can use `fragment` for declaring data dependencies for a React component. In order to render the data for a `fragment`, you can use the `useFragment` Hook.

```tsx
// Friend.tsx

import { graphql, useFragment } from 'react-relay/hooks';

const Friend: FC<any> = (props: Props) => {
  const data = useFragment(
    graphql`
      fragment Friend_user on User {
        id
        email
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
    </Container>
  );
};
```

### preloadQuery, usePreloadQuery

Hook used to access data fetched by an earlier call to `preloadQuery` This implements the "Render-as-You-Fetch" pattern.

`usePreloadedQuery` will suspend if the query is still pending, throw an error if it failed, and otherwise return the query results.

```tsx
// Friends.tsx 

import { graphql, useRalyEnvironment, usePreloadQuery, preloadQuery } from 'react-relay/hooks';

const Friends: FC = (): React.ReactElement => {
  const environment = useRelayEnvironment();

	const FriendQuery = graphql`
	  query FriendsQuery {
	    friends {
	      ...Friend_user
	    }
	  }
	`;

  const result = preloadQuery<FriendsQuery>(
    environment,
    FriendQuery,
    {},
    { fetchPolicy: 'store-or-network' },
  );

  const data: FriendsQueryResponse = usePreloadedQuery<FriendsQuery>(
    FriendQuery,
    result,
  );

  return (
    <Container>
      <HeaderTitle>Friends list</HeaderTitle>
      <StyledList>
        {data.friends.length > 0 ? (
          data.friends.map((friend) => <Friend key={friend.id} user={friend} />)
        ) : (
          <StyledMessage>Empty list</StyledMessage>
        )}
      </StyledList>
    </Container>
  );
};
```

### useMutation

You can execute mutation using specified `graphql` template literal. By `isInFlight`, we can know the mutation pending status.

```tsx
// SignIn.tsx

import { graphql, useMutation } from 'react-relay/hooks';

const SignInEmailMutation = graphql`
  mutation SignInMutation($email: String!, $password: String!) {
    signInEmail(email: $email, password: $password) {
      token
      user {
        id
        email
        name
        photoURL
      }
    }
  }
`;

function SignIn(props: Props): React.ReactElement {
  const { setUser } = useAppContext();
	...
  const [commit, isInFlight] = useMutation<SignInMutation>(SignInEmailMutation);

  const mutationConfig = {
    variables: {
			...
    },
    onCompleted: (response: SignInMutationResponse): void => {
      const { token, user } = response.signInEmail;
      AsyncStorage.setItem('@UserStorage:login_token', token)
        .then((res) => {
          setUser({
            ...user,
          });
        })
        .catch((e) => console.error(e));
    },
    onError: (error): void => {
      console.error(error);
      setError('Check your email and password');
    },
  };

  return (
    <Container>
			...
      <Button
        testID="btn-back"
        onClick={(): void => commit(mutationConfig)}
        text={'SignIn'}
        isLoading={isInFlight}
      />
    </Container>
  );
}
```

### useSubscription

```tsx
// Home.tsx

import { graphql, useSubscription } from 'react-relay/hooks';

const UserSubscription = graphql`
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
  } = useAppContext();

  // Subscription
  const subscriptionConfig = React.useMemo(() => {
    return {
      variables: { userId: user?.id },
      subscription: UserSubscription,
      onCompleted: (): void =>
        console.log('[Home] subscription is now closed.'),
      updater: (
        store: RecordSourceSelectorProxy<{}>,
        data: HomeUserSubscriptionResponse,
      ): void => {
        if (data) {
          setSignin(true);
        }
      },
    };
  }, [user]);

  useSubscription(subscriptionConfig);

  React.useEffect((): void => {
    const fadeIn = (): void => {...};
    const fadeOut = (): void => {...};
    signin ? fadeIn() : fadeOut();
  }, [signin]);

  return (
    <Container>
			...
			{* This will show if the user signin on another environment *}
      <Animated.View
        style={{...}}
      >
        <Text>A new device has signed in</Text>
      </Animated.View>
    </Container>
  );
}
```

## Todo

- [ ]  Describe how to integrate relay to this app
- [ ]  Update script and describe how to use it
- [ ]  Resolve cache invalidation when `signout`
- [ ]  Replace graphql server URL