import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import theme from '../../utils/theme';

interface Props {
  image: string;
  name: string;
  status: string;
}

class CharacterCard extends React.PureComponent<Props, {}> {
  static HEIGHT = 100;

  render() {
    const {image, name, status} = this.props;

    return (
      <View style={styles.root}>
        <Image
          style={styles.image}
          source={{uri: image}}
          resizeMode="contain"
        />
        <View style={styles.meta}>
          <Text style={styles.name} numberOfLines={2}>
            {name}
          </Text>
          <Text style={styles.status}>{status}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    margin: 10,
    flexDirection: 'row',
  },
  image: {
    height: 80,
    width: 80,
    backgroundColor: theme.colors.border,
  },
  meta: {
    flex: 1,
    marginHorizontal: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: theme.colors.dark,
  },
  status: {
    color: theme.colors.grey,
  },
});

export default CharacterCard;
