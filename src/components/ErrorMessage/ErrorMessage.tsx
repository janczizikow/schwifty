import React from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';

interface OwnProps {
  onRetry?: () => void;
}

const ErrorMessage: React.FC<OwnProps> = ({onRetry}) => (
  <View style={styles.root}>
    <View style={styles.centerText}>
      <Text>Download Error</Text>
      <Text>Check your internet settings and retry.</Text>
    </View>
    {onRetry && <Button title="Retry" onPress={onRetry} />}
  </View>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  centerText: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
});

export default ErrorMessage;
