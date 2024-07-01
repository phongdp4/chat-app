import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginScreen from '../app/(auth)/login';

describe('LoginScreen', () => {
  const mockLogin = jest.fn();

  const renderLoginScreen = () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen onLogin={mockLogin} />);
    const usernameInput = getByPlaceholderText('Username');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Login');

    return { usernameInput, passwordInput, loginButton };
  };

  it('renders login screen components', () => {
    const { usernameInput, passwordInput, loginButton } = renderLoginScreen();
    expect(usernameInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(loginButton).toBeTruthy();
  });

  it('updates username and password inputs', () => {
    const { usernameInput, passwordInput } = renderLoginScreen();
    fireEvent.changeText(usernameInput, 'testuser');
    fireEvent.changeText(passwordInput, 'testpassword');
    expect(usernameInput.props.value).toBe('testuser');
    expect(passwordInput.props.value).toBe('testpassword');
  });

  it('calls onLogin with correct values', () => {
    const { usernameInput, passwordInput, loginButton } = renderLoginScreen();
    fireEvent.changeText(usernameInput, 'testuser');
    fireEvent.changeText(passwordInput, 'testpassword');
    fireEvent.press(loginButton);
    expect(mockLogin).toHaveBeenCalledWith('testuser', 'testpassword');
  });
});
