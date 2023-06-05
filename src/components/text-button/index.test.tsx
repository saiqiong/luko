import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import { TextButton } from '.';

describe('TextButton Component', () => {
  test('should display capitalised text', () => {
    render(<TextButton text="hello" onPress={() => {}} />);
    expect(screen.getByText('Hello')).toBeDefined();
  });

  test('should apply color prop to text', () => {
    render(<TextButton text="hello" onPress={() => {}} color="#000000" />);
    expect(screen.getByText('Hello')).toHaveStyle({ color: '#000000' });
  });

  test('should call onPress callback when press on button', () => {
    const callback = jest.fn();
    render(<TextButton text="hello" onPress={callback} />);
    fireEvent.press(screen.getByText('Hello'));
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should not call onPress callback when press on disabled button', () => {
    const callback = jest.fn();
    render(<TextButton text="hello" onPress={callback} disabled />);
    fireEvent.press(screen.getByText('Hello'));
    expect(callback).toHaveBeenCalledTimes(0);
  });
});
