import {createStackNavigator, createAppContainer} from 'react-navigation';
import {useScreens} from 'react-native-screens';
import * as Screens from './screens';

useScreens();

const AppNavigator = createStackNavigator(
  {
    Characters: Screens.Characters,
    Search: Screens.Search,
  },
  {
    initialRouteName: 'Characters',
    headerMode: 'none',
    mode: 'modal',
    cardStyle: {
      backgroundColor: '#fff',
    },
  },
);

export default createAppContainer(AppNavigator);
