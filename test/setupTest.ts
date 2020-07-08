import '@testing-library/jest-native/extend-expect';
import 'jest-styled-components';
import WebSocket from 'ws';

// Setting for relay subscription
Object.assign(global, {
  WebSocket,
});

jest.mock('../src/relay', () => {
  // eslint-disable-next-line
  const { createMockEnvironment } = require('relay-test-utils');
  const mockRelay = createMockEnvironment();
  mockRelay.init = jest.fn();
  return mockRelay;
});
