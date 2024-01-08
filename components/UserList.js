import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { ScreenType } from '../constants/constants';

const UserList = ({ users, onExit, screen, setScreen, screenParam, setScreenParam  }) => {
  const renderItem = ({ item }) => (
    <Pressable onPress={() => onExit(ScreenType.see_user, item.login)}>
      <View style={styles.userContainer}>
        <Text style={styles.userName}>{ item.id } - {item.login}</Text>
      </View>
    </Pressable>
  );

  return (
    <FlatList
      data={users}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  userContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userName: {
    fontSize: 18,
  },
});

export default UserList;