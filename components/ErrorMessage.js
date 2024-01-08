import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ErrorMessage = ({ message }) => {
  if (!message) {
    return null;
  }

  return (
    <View style={styles.errorContainer}>
      <Icon name='warning-sharp' size={20} color='white' style={styles.icon}/>
      <Text style={styles.errorText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  errorText: {
    color: 'white',
    marginLeft: 10,
  },
  icon: {
    
  }
});

export default ErrorMessage;
