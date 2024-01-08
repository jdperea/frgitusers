import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import githubService from './../services/githubService';
import ErrorMessage from './../components/ErrorMessage';
import UserList from './../components/UserList';
import FollowersChart from './../components/FollowersChart';
import { ScreenType } from './../constants/constants';

const HomeScreen = ({ onExit, screen, setScreen, screenParam, setScreenParam} ) => {
  const [inputText, setInputText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [usersData, setUsersData] = useState([]);
  //const [screen , setScreen ] = useState(ScreenType.home)
  //const [screenParam , setScreenParam ] = useState("")

  const busquedasProhibidas = ['doublevpartners']; // palabras prohibidas

  const fetchFollowers = async (followers_url) => {
    try {
      const response = await fetch(followers_url);
      const data = await response.json();
      //setFollowers(data.length);
      //console.log("followers",data.length)
      return data.length;
    } catch (error) {
      console.error('Error fetching followers:', error);
    }
  }

  const handleSearch = async () => {
    // Verificar la longitud del texto
    if (inputText.length < 4) {
      setErrorMessage('La búsqueda debe tener al menos 4 caracteres.');
      setUsers([]);
      return;
    }

    // Verificar si el texto contiene palabras no permitidas, en el caso el req que solicita no mostrar doublevpartnets
    const textoEnMinuscula = inputText.toLowerCase();
    const contienePalabraProhibida = busquedasProhibidas.some(palabra =>
      textoEnMinuscula.includes(palabra)
    );

    if (contienePalabraProhibida) {
      setErrorMessage('La búsqueda contiene palabras no permitidas.');
      setUsers([]);
      return;
    }
    // Si pasa las validaciones, proceder con la búsqueda y limpiamos el Error
    setErrorMessage('');
    try {
      const users = await githubService.searchUsers(inputText);
      if (users.length > 0) {
        const primeros10Usuarios = users.slice(0, 10);
        // Guardamos data del estado en la variable
        let newDataUser = { ...usersData };

        const usuariosConFollowers = await Promise.all(
          primeros10Usuarios.map(async element => {
            // Verificar si el usuario ya está en newDataUser para evitar la petición
            if (!newDataUser[element.id]) {
              const num_followers = await fetchFollowers(element.followers_url);
              //console.log("se hace el fecth", element.login)
              element.followers = num_followers;
              newDataUser[element.id] = { id: element.id, login: element.login, followers: num_followers };
            } else {
              // Usar los datos existentes
              element.followers = newDataUser[element.id].followers;
            }
            return element;
          })
        );
        setUsersData(newDataUser);
        setUsers(usuariosConFollowers);
      } else {
        setErrorMessage('No se encontraron usuarios.');
        setUsers([])
      }
    } catch (error) {
      console.log(error)
      setErrorMessage('Hubo un error al realizar la búsqueda.');
      setUsers([])
    }
  };
  return (
    <View style={styles.container}>
        <View style={styles.search}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Escribe aquí..."
          />
            <Button title='🔍' color='#C6C4C4' style={styles.btn} onPress={handleSearch}></Button>
        </View>
        <View style={styles.listData}>
          <ErrorMessage message={errorMessage} />
          {users? <UserList users={users} onExit={(data, data1) => { setScreen(data); setScreenParam(data1); console.log(data, data1) }} screen={screen} setScreen={setScreen} screenParam={screenParam} setScreenParam = {setScreenParam} /> : null }
          {users.length > 0 ? <FollowersChart data={users} style={styles.chart} /> : null }
        </View>
        
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
  search: {
    flexDirection: 'row',
    padding: 2,
    alignItems: 'center', 
  },
  btn: {
    width: "20%",
    marginLeft: 10,
  },
  input: {
    flex: 1,
  },
  error: {
    color: 'red',
    backgroundColor: 'pink',
    padding: 5,
  },
  chart: {
    marginBottom: 20
  },
  listData: {
    flex: 1,
    marginBottom: 50,
  }
})