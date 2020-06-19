import { ThemeProvider, ThemeType } from '../providers/ThemeProvider';

import { AuthProvider } from './AuthProvider';
import React from 'react';

interface Props {
  initialThemeType?: ThemeType;
  children?: React.ReactElement;
}

// Add providers here
const RootProvider = ({
  initialThemeType = ThemeType.LIGHT,
  children,
}: Props): React.ReactElement => {
  return (
    <ThemeProvider
      initialThemeType={initialThemeType}
    >
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
};

export default RootProvider;
