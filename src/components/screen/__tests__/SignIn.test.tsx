import 'react-native';

import React, { ReactElement } from 'react';
import {
  RenderResult,
  fireEvent,
  render,
  wait,
  waitForElement,
} from '@testing-library/react-native';
import { createTestElement, createTestProps, environment } from '../../../../test/testUtils';

import AsyncStorage from '@react-native-community/async-storage';
import AuthContext from '../../../providers/AuthProvider';
import { MockPayloadGenerator } from 'relay-test-utils';
import SignIn from '../SignIn';
import { ThemeType } from '../../../providers/ThemeProvider';
import { act } from 'react-test-renderer';

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
  });
});

describe('[SignIn] interaction', () => {
  beforeAll(() => {
    props = createTestProps();
    component = createTestElement(<SignIn {...props} />);
    testingLib = render(component);
  });

  it('should invoke changeText event handler when email changed', async () => {
    const emailInput = testingLib.getByTestId('input-email');
    await waitForElement(() => emailInput); // why we should use it?

    act(() => {
      fireEvent.changeText(emailInput, 'email@email.com');
    });

    expect(emailInput.props.value).toEqual('email@email.com');
  });

  it('should invoke changeText event handler when password changed', async () => {
    const passwordInput = testingLib.getByTestId('input-password');
    await waitForElement(() => passwordInput); // why we should use it?

    act(() => {
      fireEvent.changeText(passwordInput, 'password');
    });

    expect(passwordInput.props.value).toEqual('password');
  });

  describe('about signin submit action', () => {
    beforeAll(() => {
      testingLib = render(component);
      jest.spyOn(AsyncStorage, 'setItem').mockImplementation(jest.fn());
      jest.spyOn(AuthContext, 'useAuthContext').mockImplementation(() => ({
        state: {
          user: undefined,
          relay: environment,
        },
        setUser: jest.fn().mockReturnValue({
          id: 'userId',
          email: 'email@email.com',
          nickname: 'nickname',
          statusMessage: 'status',
        }),
        resetUser: jest.fn(),
      }));
    });
    it('should make request to signin when button has pressed and navigation switchs to [MainStack]', async () => {
      const emailText = testingLib.getByTestId('input-email');
      await waitForElement(() => emailText);

      act(() => {
        fireEvent.changeText(emailText, 'email@email.com');
      });

      const passwordText = testingLib.getByTestId('input-password');
      await waitForElement(() => passwordText);

      act(() => {
        fireEvent.changeText(passwordText, 'password');
      });

      const signinBtn = testingLib.getByTestId('btn-signin');
      await waitForElement(() => signinBtn);

      act(() => {
        fireEvent.press(signinBtn);
        environment.mock.resolveMostRecentOperation((operation) =>
          MockPayloadGenerator.generate(operation),
        );
      });
    });

    it('should fail request to signin when button has pressed with wrong info', async () => {
      const emailText = testingLib.getByTestId('input-email');
      await waitForElement(() => emailText);

      act(() => {
        fireEvent.changeText(emailText, 'wrong-email@email.com');
      });

      const passwordText = testingLib.getByTestId('input-password');
      await waitForElement(() => passwordText);

      act(() => {
        fireEvent.changeText(passwordText, 'wrong-password');
      });

      const signinBtn = testingLib.getByTestId('btn-signin');
      await waitForElement(() => signinBtn);

      act(() => {
        fireEvent.press(signinBtn);
        environment.mock.rejectMostRecentOperation(new Error('reject'));
      });

      const errorText = testingLib.getByTestId('error-text');
      await act(() => wait());
      expect(errorText).toBeTruthy();
    });
  });

  it('should navigate to [SignUp] when button has pressed', async () => {
    const signUpBtn = testingLib.getByText("Don't have an account yet?");
    await waitForElement(() => signUpBtn);

    act(() => {
      fireEvent.press(signUpBtn);
    });

    expect(props.navigation.navigate).toHaveBeenCalledWith('SignUp');
  });
});
