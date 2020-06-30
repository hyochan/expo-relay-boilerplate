import React, { ReactElement, Suspense } from 'react';
import { ThemeProvider, ThemeType } from '../providers/ThemeProvider';
import { AuthProvider } from './AuthProvider';
import { Environment } from 'relay-runtime';
// import { LoadingIndicator } from 'dooboo-ui';
import ErrorBoundary from '../ErrorBoundary';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import SuspenseScreen from '../components/screen/Suspense';
import { createMockEnvironment } from 'relay-test-utils';

interface Props {
  initialThemeType?: ThemeType;
  children?: React.ReactElement;
}

interface RelayProvidersProps {
  children?: React.ReactElement;
}

export const environment: Environment = createMockEnvironment();

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

// Add providers here
const RootProvider = ({
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

export default RootProvider;
