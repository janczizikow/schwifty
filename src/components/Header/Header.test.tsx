import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Header from './Header';
import {TouchableOpacity} from 'react-native';

describe('<Header />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Header title="Schwifty" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls onPressSearch', () => {
    const mockCallback = jest.fn();
    const testRenderer = renderer.create(
      <Header title="Schwifty" onPressSearch={mockCallback} />,
    );
    const button = testRenderer.root.findByType(TouchableOpacity);
    button.props.onPress();

    expect(mockCallback).toBeCalled();
  });
});
