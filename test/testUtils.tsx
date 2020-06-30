import 'react-native';

import React, { ReactElement } from 'react';

import TestProvider from '../src/providers/TestProvider';
import { ThemeType } from '../src/providers/ThemeProvider';

export const createTestElement = (
  child: ReactElement,
  themeType?: ThemeType,
): ReactElement => (
  <TestProvider initialThemeType={themeType}>{child}</TestProvider>
);

export const createTestProps = (
  obj: Record<string, unknown> = {},
): Record<string, unknown> | unknown | any => ({
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    replace: jest.fn(),
    setOptions: jest.fn(),
  },
  ...obj,
});
