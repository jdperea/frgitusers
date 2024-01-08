import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTittle}>Search Github Users</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    headerContainer: {
        width: "100%",
        height: "13%",
        backgroundColor: Platform.OS == "android" ? "#121212": "#d5d5d5",
        paddingTop: 30,

    },
    headerTittle: {
        color: Platform.OS == "android" ? "#d5d5d5": "#121212",
        fontSize: 30,
        fontWeight: "bold",
        padding: 10,
        marginTop: 10,
    }
})