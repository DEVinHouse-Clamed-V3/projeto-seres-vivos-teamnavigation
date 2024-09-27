import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, FlatList, View, Image, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/global';
import axios from 'axios';


const Protista = () => {

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
        style={styles.flatStyle}
        data={protista}
        renderItem={({ item }) => (
          <View style={styles.viewStyle}>
            <View style={styles.viewStyleCenter}>
              <Image style={styles.imagem} source={{ uri: item.image, }} />
            </View>
            <Text style={styles.textBold}>Nome:<Text style={styles.textNormal}>{item.name}</Text></Text>
            <Text style={styles.textBold}>Descrição: <Text style={styles.textNormal}>{item.description}</Text></Text>
            <Text style={styles.textBold}>Nutrição: <Text style={styles.textNormal}>{item.nutrition}</Text></Text>
            <Text style={styles.textBold}>Tipo celular: <Text style={styles.textNormal}>{item.cellType}</Text></Text>
            <Text style={styles.textBold}>Organização Celular: <Text style={styles.textNormal}>{item.cellOrganization}</Text></Text>
            <Text style={styles.textBold}>Reprodução: <Text style={styles.textNormal}>{item.reproduction}</Text></Text>
            <Text style={styles.textBold}>Respiração: <Text style={styles.textNormal}>{item.respiration}</Text></Text>
          </View>

        )}
        ListEmptyComponent={() => (
          <View><Text>Sem nada aqui.</Text></View>
        )}
      />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imagem: {
    width: '100%',
    height: 250
  },
  viewStyle: {
    alignItems: 'left',
    justifyContent: 'center',
    width: '90%',
    borderWidth: 2,
    shadowColor: '#000',
    padding: 15,
    gap: 5,
    marginTop: 10,
    borderRadius: 10

  },
  viewStyleCenter: {
    alignItems: 'center'
  },
  textBold: {
    fontWeight: 'bold'
  },
  textNormal: {
    fontStyle: 'normal'
  }
})


export default Protista;
