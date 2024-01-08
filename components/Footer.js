import { Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import Svg , { Path } from 'react-native-svg';
import { ScreenType } from '../constants/constants';

const Footer = ({onExit, setScreen}) => {
  return (
    <Pressable  style={styles.foot} onPress={() => onExit(ScreenType.home )}>
      <View>
        <Svg height="50" width="50" viewBox="0 0 24 24" >
              <Path
              d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"
              fill="white"
              />
        </Svg>
      </View>
    </Pressable>
  )
}

export default Footer

const styles = StyleSheet.create({
    foot: {
        position: 'absolute',
        bottom: 0,
        width: "100%",
        alignItems: 'center',
        backgroundColor: Platform.OS == "android" ? "#121212": "#000",
        paddingVertical: 5,
    }
})