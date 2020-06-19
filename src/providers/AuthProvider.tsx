import React, { useReducer } from 'react';

import RelayEnvironment, {
  RelayEnvironmentProps,
} from '../relay/RelayEnvironment';
import { AsyncStorage } from 'react-native';
import { User } from '../types';
import createCtx from '../utils/createCtx';

interface Context {
  state: State;
  setUser: (user: User) => void;
  resetUser: () => void;
  resetRelay: () => void;
}
const [useCtx, Provider] = createCtx<Context>();

export enum ActionType {
  ResetUser = 'reset-user',
  SetUser = 'set-user',
  ResetRelay = 'reset-relay',
}

export interface State {
  user: User | null;
  relay: RelayEnvironmentProps;
}

const initialState: State = {
  user: null,
  relay: RelayEnvironment.getEnvironment(),
};

interface SetUserAction {
  type: ActionType.SetUser;
  payload: User;
}

interface ResetUserAction {
  type: ActionType.ResetUser;
}

interface ResetRelayAction {
  type: ActionType.ResetRelay;
  payload: RelayEnvironmentProps;
}

type Action = SetUserAction | ResetUserAction | ResetRelayAction;

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
  AsyncStorage.removeItem('@UserStorage:login_token').then(() => {
    dispatch({
      type: ActionType.ResetUser,
    });
  });
};

const resetRelay = (dispatch: React.Dispatch<ResetRelayAction>) => (): void => {
  dispatch({
    type: ActionType.ResetRelay,
    payload: RelayEnvironment.resetEnvironment(),
  });
};

const reducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'reset-user':
      return { ...initialState, relay: RelayEnvironment.resetEnvironment() };
    case 'set-user':
      return { ...state, user: action.payload };
    case 'reset-relay':
      return { ...state, relay: action.payload };
    default:
      return state;
  }
};

function AuthProvider(props: Props): React.ReactElement {
  const [state, dispatch] = useReducer<Reducer>(reducer, initialState);

  const actions = {
    setUser: setUser(dispatch),
    resetUser: resetUser(dispatch),
    resetRelay: resetRelay(dispatch),
  };

  return <Provider value={{ state, ...actions }}>{props.children}</Provider>;
}

export { useCtx as useAuthContext, AuthProvider };
