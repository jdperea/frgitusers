import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import githubService from './../services/githubService';
import ErrorMessage from './../components/ErrorMessage';

const UserScreen = ({login}) => {
  const [user, setUser] = useState(login);
  const [dataUser, setDataUser] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await githubService.getUser(user);
        //console.log(userData);
        //console.log(userData.avatar_url, userData.id, userData.followers, userData.location, userData.login, userData.name, userData.public_repos);
        setDataUser({avatar: userData.avatar_url, blog: userData.blog, id: userData.id, followers: userData.followers, location: userData.location, login: userData.login, name: userData.name, repos: userData.public_repos});
      } catch (error) {
        console.log(error);
        setErrorMessage('Hubo un error al realizar buscar el usuario');
      }
    };
  
    fetchData();
  },[user]);
  
  return (
    <View>
      {dataUser.id ? <>
        <Image source={{uri: dataUser.avatar}} style={styles.userProfile} />
        <View style={styles.blockInfo}>
        <Text style={styles.textInfo}>{dataUser.name ? <Text>{dataUser.name},</Text>:null} {dataUser.login}</Text>
        {dataUser.location ? <Text style={styles.textInfo}>From {dataUser.location}</Text> : null }
        {dataUser.blog ? <Text style={styles.textDesc}>{dataUser.blog}</Text> : null }
        <Text style={styles.textDesc}># Repos(public): {dataUser.repos}</Text>
        <Text style={styles.textDesc}>Followers: {dataUser.followers}</Text>
        </View>
      </> : <ActivityIndicator size="large" color="#00ff00" />}
      <ErrorMessage message={errorMessage} />
    </View>
  )
}

export default UserScreen

const styles = StyleSheet.create({
  userProfile: {
    borderRadius: 100,
    marginHorizontal: Dimensions.get('window').width*0.25,
    marginVertical: 25,
    width: Dimensions.get('window').width*0.5,
    height: Dimensions.get('window').width*0.5
  },
  blockInfo: {
    textAlign: 'center',
    //marginHorizontal: Dimensions.get('window').width*0.10,
    width: Dimensions.get('window').width
  },
  textInfo: {
    marginVertical: 5,
    textAlign: 'center',
    fontSize: 20,
  },
  textDesc: {
    marginVertical: 5,
    textAlign: 'center',
    fontSize: 15,
  },
})