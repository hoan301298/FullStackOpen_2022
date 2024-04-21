import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInContainer } from '../../components/SignIn';
import * as React from 'react';
// ...

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button
        
      const onSubmit = jest.fn();

      const {getByTestId} = render(
          <SignInContainer onSubmit={onSubmit} />
      )

      fireEvent.changeText(getByTestId('Username'), 'matti');
      fireEvent.changeText(getByTestId('Password'), 'password');
      fireEvent.press(getByTestId('Login'));
      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0].username).toBe('matti');
        expect(onSubmit.mock.calls[0][0].password).toBe('password');
      });
    });
  });
});