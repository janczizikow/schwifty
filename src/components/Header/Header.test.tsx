import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Header from './Header';
import {TouchableOpacity, TextInput} from 'react-native';

describe('<Header />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Header title="Schwifty" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls onBackButtonPress', () => {
    const mockCallback = jest.fn();
    const testRenderer = renderer.create(
      <Header title="Schwifty" onBackButtonPress={mockCallback} />,
    );
    const button = testRenderer.root.findByType(TouchableOpacity);
    button.props.onPress();

    expect(mockCallback).toBeCalled();
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

  it('renders TextInput when given onChangeSearchText prop', () => {
    const mockCallback = jest.fn();
    const testRenderer = renderer.create(
      <Header title="Schwifty" onChangeSearchText={mockCallback} />,
    );

    testRenderer.root.findByType(TextInput);
  });
});
