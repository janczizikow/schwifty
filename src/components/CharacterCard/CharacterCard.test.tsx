import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import CharacterCard from './CharacterCard';

const fakeProps = {
  name: 'Rick Sanchez',
  status: 'alive',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
};

describe('<CharacterCard />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<CharacterCard {...fakeProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
