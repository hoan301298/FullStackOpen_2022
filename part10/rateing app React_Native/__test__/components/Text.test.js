import { Text, View } from 'react-native';
import { render } from '@testing-library/react-native';
import * as React from 'react';

const Greeting = ({ name }) => {
  return (
    <View>
      <Text testID={`${name}`}>Hello {name}!</Text>
    </View>
  );
};

describe('Greeting', () => {
  it('renders a greeting message based on the name prop', () => {
    const { debug, getByTestId } = render(<Greeting name="Kalle"/>);

    debug();

    expect(getByTestId('Kalle')).toHaveTextContent('Hello Kalle!');
  });
});