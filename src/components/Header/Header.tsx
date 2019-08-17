import React from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../../utils/theme';

interface OwnProps {
  title: string;
  onPressSearch?: () => void;
}

const Header = React.memo<OwnProps>(({title, onPressSearch}) => (
  <SafeAreaView style={styles.header}>
    <View style={styles.headerInner}>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      {onPressSearch && (
        <TouchableOpacity onPress={onPressSearch}>
          <Icon
            name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
            size={24}
            color={theme.colors.primary}
          />
        </TouchableOpacity>
      )}
    </View>
  </SafeAreaView>
));

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 5,
    elevation: 7,
    zIndex: 999,
  },
  headerInner: {
    height: Platform.select({
      android: 56,
      ios: 44,
    }),
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: theme.colors.dark,
    fontSize: 24,
  },
});

export default Header;
