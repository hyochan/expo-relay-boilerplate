import 'react-native';

import React, { ReactElement } from 'react';
import { RenderResult, render } from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import SignIn from '../SignIn';
import { ThemeType } from '../../../providers/ThemeProvider';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let props: any;
let component: ReactElement;
let testingLib: RenderResult;

describe('[SignIn] rendering test', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<SignIn {...props} />);
  });

  it('should render without crashing', async () => {
    component = createTestElement(<SignIn {...props} />);
    testingLib = render(component);

    // Remove snapshot testing for now for issue https://github.com/VirgilSecurity/virgil-e3kit-js/issues/82
    expect(testingLib.baseElement).toMatchSnapshot();
  });

  it('should render [Dark] mode without crashing', () => {
    component = createTestElement(<SignIn {...props} />, ThemeType.DARK);
    testingLib = render(component);
    expect(testingLib.baseElement).toBeTruthy();
    // expect(testingLib.baseElement).toMatchSnapshot();
  });
});
