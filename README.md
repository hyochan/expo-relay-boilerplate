# Apply Relay hooks on Expo
> Environment
```textline
- node@14.1.0
- yarn@1.22.4
- dooboo-cli@3.4.5
- watchman@4.9.0
```

> dependencies
```json
// package.json
{
	"dependencies": {
		...
		"react": "^0.0.0-experimental-33c3af284",
  		"react-dom": "^0.0.0-experimental-33c3af284",
		"react-relay": "^0.0.0-experimental-895a6fe0",
		...
	},
	"devDependencies": {
		...
		"babel-plugin-relay": "^9.1.0",
		"graphql": "^15.0.0",
		...
	}
}
```

## 패키지 설치
```bash
yarn add react@experimental react-dom@experimental react-relay@experimental
```

## Babel plugin 설치 / 설정
자바스크립트 코드 내의 `graphql tag` 들을 실행할 수 있도록 `babel-plugin`을 설치

```bash
yarn add --dev babel-plugin-relay graphql
```

`.babelrc` 파일의 플러그인 리스트에  `"relay"` 추가

```json
{
	"plugins": [
		...
		"relay"
	]
}
```

## Relay 컴파일러
Fragment 혹은 Query와 같은 Relay 컴포넌트를 작성할 때마다, Relay 컴파일러의 실행이 필요하다. Relay 컴파일러는 자바스크립트 코드 내의 graphql 을 읽고 분석하며, Relay 런타임에서 사용할 파일을 생성한다.

### 컴파일러 설치
```bash
yarn add --dev relay-compiler
```

### 컴파일 스크립트 추가
우리는 typescript 환경에서 작업하기 때문에 `extensions ts tsx` 또한 추가한다.
(필요에 따라 `js jsx` 와 같이 추가할 수 있다.)
```json
"scripts": {
	...
	"relay": "yarn run relay-compiler --schema schema.graphql --src ./src/ --extensions ts tsx --watchman false $@",
	...
}
```

## 추가적인 설정

### relay-config

```bash
yarn add --dev relay-config
```

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

### Graphql schema script

만약 relay 컴파일에 필요한 schema.graphql 을 커맨드 명령으로 얻고 싶다면, `get-graphql-schema` 라이브러리를 추천한다.

```bash
yarn add --dev get-graphql-schema
```

다음과 같이 사용

```json
"get-graphql-schema": "get-graphql-schema YOUR_GRAPHQL_SERVER_URI > schema.graphql"
```

### typescript support

```bash
yarn add --dev relay-compiler-language-typescript @types/react-relay @types/relay-runtime
```