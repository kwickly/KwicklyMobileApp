import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { View, Text } from 'react-native';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

jest.mock('@react-navigation/native', () => {
  const { View } = require('react-native');
  return {
    NavigationContainer: ({ children }: any) => <View>{children}</View>,
  };
});

jest.mock('@react-navigation/bottom-tabs', () => {
  const { View } = require('react-native');
  return {
    createBottomTabNavigator: () => ({
      Navigator: ({ children }: any) => <View testID="tab-navigator">{children}</View>,
      Screen: ({ name, component: Component }: any) => <Component testID={`tab-screen-${name}`} />,
    }),
  };
});

jest.mock('@react-navigation/native-stack', () => {
  const { View } = require('react-native');
  return {
    createNativeStackNavigator: () => ({
      Navigator: ({ children }: any) => <View testID="stack-navigator">{children}</View>,
      Screen: ({ name, component: Component }: any) => <Component testID={`stack-screen-${name}`} />,
    }),
  };
});

import AppNavigator from './AppNavigator';
import { useAuthStore } from '../store/useAuthStore';

// Mock the auth store
jest.mock('../store/useAuthStore');

// Mock Lucide Icons
jest.mock('lucide-react-native', () => {
  const { Text } = require('react-native');
  return {
    Home: () => <Text>HomeIcon</Text>,
    Coffee: () => <Text>CoffeeIcon</Text>,
    Wallet: () => <Text>WalletIcon</Text>,
    User: () => <Text>UserIcon</Text>,
  };
});

// Mock Screens to simplify testing
jest.mock('../screens/HomeScreen', () => {
  const { View } = require('react-native');
  return () => <View testID="home-screen" />;
});
jest.mock('../screens/MenuScreen', () => {
  const { View } = require('react-native');
  return () => <View />;
});
jest.mock('../screens/WalletScreen', () => {
  const { View } = require('react-native');
  return () => <View />;
});
jest.mock('../screens/ProfileScreen', () => {
  const { View } = require('react-native');
  return () => <View />;
});
jest.mock('../screens/LoginScreen', () => {
  const { View } = require('react-native');
  return () => <View testID="login-screen" />;
});
jest.mock('../screens/RegisterScreen', () => {
  const { View } = require('react-native');
  return () => <View />;
});

describe('AppNavigator Auth Gate', () => {
  const mockCheckAuth = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state while checking token', () => {
    (useAuthStore as any).mockReturnValue({
      user: null,
      token: null,
      isLoading: true,
      checkAuth: mockCheckAuth,
    });

    let component: any;
    act(() => {
      try {
        component = renderer.create(<AppNavigator />);
      } catch (e) {
        console.log("RENDER ERROR:", e);
      }
    });
    
    const root = component.root;
    // Check ActivityIndicator is rendered
    expect(() => root.findByProps({ testID: 'login-screen' })).toThrow();
    expect(() => root.findByProps({ testID: 'home-screen' })).toThrow();
  });

  it('renders unauthenticated content when no token exists', () => {
    (useAuthStore as any).mockReturnValue({
      user: null,
      token: null,
      isLoading: false,
      checkAuth: mockCheckAuth,
    });

    let component: any;
    act(() => {
      try {
        component = renderer.create(<AppNavigator />);
      } catch (e) {
        console.log("RENDER ERROR:", e);
      }
    });
    
    const root = component.root;
    expect(root.findByProps({ testID: 'login-screen' })).toBeTruthy();
    expect(() => root.findByProps({ testID: 'home-screen' })).toThrow();
  });

  it('renders protected content when token exists and is valid', () => {
    (useAuthStore as any).mockReturnValue({
      user: { id: '1', name: 'Test' },
      token: 'fake-jwt-token',
      isLoading: false,
      checkAuth: mockCheckAuth,
    });

    let component: any;
    act(() => {
      try {
        component = renderer.create(<AppNavigator />);
      } catch (e) {
        console.log("RENDER ERROR:", e);
      }
    });
    
    const root = component.root;
    expect(() => root.findByProps({ testID: 'login-screen' })).toThrow();
    expect(root.findByProps({ testID: 'home-screen' })).toBeTruthy();
  });
});
