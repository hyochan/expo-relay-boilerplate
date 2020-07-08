import React, { useReducer } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Environment } from 'relay-runtime';
import Relay from '../relay';
import { User } from '../types';
import createCtx from '../utils/createCtx';

interface Context {
  state: State;
  setUser(user: User): void;
  resetUser(): void;
}
const [useCtx, Provider] = createCtx<Context>();

export enum ActionType {
  ResetUser = 'reset-user',
  SetUser = 'set-user',
}

export interface State {
  user: User | null;
  relay: Environment;
}

const initialState: State = {
  user: null,
  relay: Relay.environment,
};

interface SetUserAction {
  type: ActionType.SetUser;
  payload: User;
}

interface ResetUserAction {
  type: ActionType.ResetUser;
}

type Action = SetUserAction | ResetUserAction;

interface Props {
  children?: React.ReactElement;
}

type Reducer = (state: State, action: Action) => State;

const setUser = (dispatch: React.Dispatch<SetUserAction>) => (
  user: User,
): void => {
  dispatch({
    type: ActionType.SetUser,
    payload: user,
  });
};

const resetUser = (dispatch: React.Dispatch<ResetUserAction>) => (): void => {
  Relay.init();

  AsyncStorage.removeItem('@UserStorage:login_token').then(() => {
    dispatch({
      type: ActionType.ResetUser,
    });
  });
};

const reducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'reset-user':
      return { ...initialState, relay: Relay.environment };
    case 'set-user':
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

function AuthProvider(props: Props): React.ReactElement {
  const [state, dispatch] = useReducer<Reducer>(reducer, initialState);

  const actions = {
    setUser: setUser(dispatch),
    resetUser: resetUser(dispatch),
  };

  return <Provider value={{ state, ...actions }}>{props.children}</Provider>;
}

const AuthContext = {
  useAuthContext: useCtx,
  AuthProvider,
};

export { useCtx as useAuthContext, AuthProvider };
export default AuthContext;
