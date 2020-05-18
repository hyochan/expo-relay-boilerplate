# expo-relay
[Relay](https://relay.dev/)는 [Graphql](https://graphql.org/) 기반의 `data-driven` React 어플리케이션을 구축
하기 위한 Javascript 프레임워크입니다. Relay는 정적 쿼리와 사전 코드 생성(ahead-of-time code generation)을 통해 보다 사용하기 쉽고 확장성, 무엇보다도 성능 향상이 가능하도록 디자인 되었습니다.

Relay에 대한 자세한 소개는 [Introduction to Relay](https://relay.dev/docs/en/introduction-to-relay)에서 확인하시기 바랍니다.

이 곳에서는 [React Concurrent Mode](https://reactjs.org/docs/concurrent-mode-intro.html) 및 [Suspense](https://reactjs.org/docs/concurrent-mode-suspense.html)를 지원하는 새로운 Hook 기반의 API인 Relay Hooks의 [experimental](https://github.com/facebook/relay/tree/master/packages/relay-experimental) 릴리즈를 [Expo-web](https://docs.expo.io/workflow/web/#-progressive-web-apps)에 적용하여 빌드하는 방법에 대해 다룹니다.

## Environment
```
- node: 12.16.3
- yarn: 1.22.4
- dooboo-cli: 3.4.5
- watchman: 4.9.0
```

> [dooboo-cli](https://github.com/dooboolab/dooboo-cli)를 통해 expo 템플릿을 생성했습니다.

## Dependency Version Info
```
// dependencies
- react: 0.0.0-experimental-f42431abe
- react-dom: 0.0.0-experimental-f42431abe
- react-relay: ^0.0.0-experimental-895a6fe0

// dev dependencies
- relay-compiler: 9.1.0
- relay-compiler-language-typescript: ^12.0.2
- babel-plugin-relay: ^9.1.0
- graphql: ^15.0.0
```

## Getting Started
```bash
git clone https://github.com/devethan/expo-relay.git
cd expo-relay/

yarn
yarn start --web

# 새로운 터미널에서..
yarn relay-watch
```

## Usage
### usePreloadedQuery

### useMutation

### useSubscribe

***
## Integration log
> experimental 버전이기 때문에 예상하지 못한 에러가 발생할 수 있습니다.

### Package Install
```bash
yarn add react@experimental react-dom@experimental react-relay@experimental

yarn add --dev relay-compiler relay-config babel-plugin-relay graphql get-graphql-schema relay-compiler-language-typescript @types/react-relay @types/relay-runtime
```

### babel config
```json
{
	"plugins": [
		"relay",
		"macros"
	]
}
```

### Relay 컴파일러
Relay는 컴포넌트에 fetching 할 데이터 쿼리를 미리 선언합니다. 그리고 이런 쿼리를 relay-compiler에서 컴파일하여 **ahead-of-time code generation**을 완성합니다.

이 곳에서는 typescript 환경에서 작업하기 때문에 컴파일 옵션으로 `extensions ts tsx`을 추가합니다. (필요에 따라 `js jsx` 와 같이 추가할 수 있습니다.)

```json
"scripts": {
	"relay": "yarn run relay-compiler --schema schema.graphql --src ./src/ --extensions ts tsx --watchman false $@",
}
```

### relay-config
```js
// relay.config.js
module.exports = {
  // ...
  // Configuration options accepted by the `relay-compiler` command-line tool and `babel-plugin-relay`.
  src: "./src",
  schema: "./data/schema.graphql",
  exclude: ["**/node_modules/**", "**/__mocks__/**", "**/__generated__/**"],
}
```

### Get graphql schema [Optional]
만약 relay 컴파일에 필요한 schema.graphql을 URL을 통해 얻고 싶다면, `get-graphql-schema` 라이브러리를 사용할 수 있다.

```json
"get-graphql-schema": "get-graphql-schema YOUR_GRAPHQL_SERVER_URI > schema.graphql"
```
