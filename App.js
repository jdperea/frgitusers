import React, { useState, useEffect  } from 'react'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import UserScreen from './screens/UserScreen';
import { ScreenType } from './constants/constants';

export default function App() {
  const [screen , setScreen ] = useState(ScreenType.home);
  const [screenParam , setScreenParam ] = useState("");

  let content;
  if (screen === ScreenType.home){
    content = <HomeScreen onExit={() => {}} screen={screen} setScreen={setScreen} screenParam={screenParam} setScreenParam = {setScreenParam} />;
  } else if(screen === ScreenType.see_user){
    console.log( screenParam.toString() )
    content = <>
      <UserScreen login={screenParam.toString()} />
      <Footer onExit={(data) => { setScreen(data); }} setScreen={setScreen}/>
    </>;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header />
        <StatusBar />
        {content}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});
