import { StyleProp, TextStyle } from 'react-native';

import { SFC } from 'react';

export interface User {
  id: string;
  email: string | null;
  name: string | null;
  photoURL: string | null;
}

interface IconProps {
  style?: StyleProp<TextStyle>;
  width?: number | string;
  height?: number | string;
  children?: never;
}

export type IconType = SFC<IconProps>;
