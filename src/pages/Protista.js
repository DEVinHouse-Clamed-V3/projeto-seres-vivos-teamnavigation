import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, FlatList, View, Image, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/global';
import axios from 'axios';


const Protista  = () => {

  const [protista, setProtista] = useState([])

  useEffect(() => {
    axios.get('http://192.168.100.11:3000/protista').then((response) => {
      setTimeout(() => {
        setProtista(response.data)
        }, 1000)
    })
    .catch(() => {
      Alert.alert("Não foi possivel carregar o reino.")
    })
  }, [])

  return (
    <SafeAreaView style={globalStyles.container}>
            <Text>Tela do reino protista</Text>
      <FlatList 
        data={protista}
        renderItem={({item}) => (
          <View>
            <Text>Nome: {item.name}</Text>
            <Text>Descrição: {item.description}</Text>
            <Text>Nutrição: {item.nutrition}</Text>
            <Text>Tipo celular: {item.cellType}</Text>
            <Text>Organização Celular: {item.cellOrganization}</Text>
            <Text>Reprodução: {item.reproduction}</Text>
            <Text>Respiração: {item.respiration}</Text>
      <Image style={styles.imagem}source={{uri: item.image,}}/>
      </View>
          
        )}
        ListEmptyComponent={() => (
          <View><Text>Sem nada aqui.</Text></View>
      )}
      />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create ({
  imagem: {
    width: 250,
    height: 250
  }
})


export default Protista;
