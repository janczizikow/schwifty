import React from 'react';
import {Button} from 'react-native';
import renderer from 'react-test-renderer';
import ErrorMessage from './ErrorMessage';

describe('<ErrorMessage />', () => {
  it('renders correctly', () => {
    const component = renderer.create(<ErrorMessage />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls onRetry', () => {
    const mockedCallback = jest.fn();
    const testRenderer = renderer.create(
      <ErrorMessage onRetry={mockedCallback} />,
    );
    const button = testRenderer.root.findByType(Button);
    button.props.onPress();

    expect(mockedCallback).toBeCalled();
  });
});
