import {LayoutProvider} from 'recyclerlistview';
import {Dimensions} from 'react-native';
import CharacterCard from '../CharacterCard/CharacterCard';

const {width} = Dimensions.get('window');

export const LAYOUT_TYPE = 'CHARACTER';

const instance = new LayoutProvider(
  _ => LAYOUT_TYPE,
  (type, dim) => {
    switch (type) {
      case LAYOUT_TYPE:
        dim.width = width;
        dim.height = CharacterCard.HEIGHT;
        break;
      default:
        dim.width = 0;
        dim.height = 0;
        break;
    }
  },
);

export default instance;
