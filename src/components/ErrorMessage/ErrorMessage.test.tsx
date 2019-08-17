import {Button} from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import ErrorMessage from './ErrorMessage';

describe('<ErrorMessage />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<ErrorMessage />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a Button when given a prop', () => {
    const testRenderer = renderer.create(
      <ErrorMessage onRetry={() => jest.fn()} />,
    );
    expect(testRenderer.root.findAllByType(Button)).toHaveLength(1);
  });
});
