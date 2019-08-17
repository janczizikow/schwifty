import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../../utils/theme';

interface OwnProps {
  onBackButtonPress?: () => void;
  title?: string;
  onPressSearch?: () => void;
  onChangeSearchText?: (searchText: string) => void;
}

const Header = React.memo<OwnProps>(
  ({onBackButtonPress, title, onPressSearch, onChangeSearchText}) => (
    <SafeAreaView style={styles.header}>
      <View style={styles.headerInner}>
        {onBackButtonPress && (
          <TouchableOpacity onPress={onBackButtonPress}>
            <Icon
              name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
              size={24}
              color={theme.colors.primary}
            />
          </TouchableOpacity>
        )}
        {title ? (
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        ) : null}
        {onPressSearch && (
          <TouchableOpacity onPress={onPressSearch}>
            <Icon
              name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
              size={24}
              color={theme.colors.primary}
            />
          </TouchableOpacity>
        )}
        {onChangeSearchText && (
          <TextInput
            style={styles.searchBar}
            returnKeyType="search"
            clearButtonMode="always"
            placeholder="Search"
            autoFocus
            onChangeText={onChangeSearchText}
          />
        )}
      </View>
    </SafeAreaView>
  ),
);

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
  searchBar: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
});

export default Header;
