import 'react-native';

import React, { ReactElement, Suspense } from 'react';
import { RelayMockEnvironment, createMockEnvironment } from 'relay-test-utils';
import { ThemeProvider, ThemeType } from '../src/providers/ThemeProvider';

import { AuthProvider } from '../src/providers/AuthProvider';
import ErrorBoundary from '../src/ErrorBoundary';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import SuspenseScreen from '../src/components/screen/Suspense';

interface Props {
  initialThemeType?: ThemeType;
  children?: React.ReactElement;
}

interface RelayProvidersProps {
  children?: React.ReactElement;
}

export const environment: RelayMockEnvironment = createMockEnvironment();

const RelayProviderWrapper = ({
  children,
}: RelayProvidersProps): ReactElement => {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <ErrorBoundary fallback={<SuspenseScreen error />}>
        <Suspense fallback={<SuspenseScreen />}>{children}</Suspense>
      </ErrorBoundary>
    </RelayEnvironmentProvider>
  );
};

export const TestProvider = ({
  initialThemeType = ThemeType.LIGHT,
  children,
}: Props): React.ReactElement => {
  return (
    <ThemeProvider initialThemeType={initialThemeType}>
      <AuthProvider>
        <RelayProviderWrapper>{children}</RelayProviderWrapper>
      </AuthProvider>
    </ThemeProvider>
  );
};

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
