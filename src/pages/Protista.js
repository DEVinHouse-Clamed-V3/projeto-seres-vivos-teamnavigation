import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, FlatList, View, Image, StyleSheet, TextInput, Alert } from 'react-native';
import axios from 'axios';

const Protista = () => {

  const [protista, setProtista] = useState([]); // Estado para armazenar os dados da API
  const [searchText, setSearchText] = useState(''); // Estado para armazenar o termo de pesquisa

  // Efeito para buscar dados da API ao carregar o componente
  useEffect(() => {
    axios.get('http://192.168.100.11:3000/protista')
      .then((response) => {
        setTimeout(() => {
          setProtista(response.data);
        }, 1000);
      })
      .catch(() => {
        Alert.alert("Não foi possivel carregar o reino.");
      });
  }, []);

  // Função que renderiza cada item na lista
  const protistaItem = ({ item }) => (
    <View style={styles.cardStyle}>
      <Image style={styles.imageCard} source={{ uri: item.image }} />
      <View style={styles.containerCard}>
        <Text style={styles.nameCard}>{item.name}</Text>
        <Text style={styles.descriptionCard}>{item.description}</Text>
        <Text style={styles.detailCard}>Nutrição: <Text style={styles.detailCard}>{item.nutrition}</Text></Text>
        <Text style={styles.detailCard}>Tipo celular: {item.cellType}</Text>
        <Text style={styles.detailCard}>Organização Celular: {item.cellOrganization}</Text>
        <Text style={styles.detailCard}>Reprodução: {item.reproduction}</Text>
        <Text style={styles.detailCard}>Respiração: {item.respiration}</Text>
      </View>
    </View>
  );

  // Função que filtra os dados com base no termo de pesquisa
  const protistaFiltrados = protista.filter((item) => 
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textHeader}>Reino Protista</Text>
      
      {/* Campo de Pesquisa */}
      <View style={styles.searchArea}>
        <TextInput
          style={styles.inputTextSearch}
          placeholder='Pesquise'
          placeholderTextColor='#888'
          value={searchText}
          onChangeText={(t) => setSearchText(t)} // Atualiza o estado com o texto digitado
        />
      </View>

      {/* FlatList para exibir os dados filtrados */}
      <FlatList
        data={protistaFiltrados} // Usa os dados filtrados
        renderItem={protistaItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <View>
            <Text style={styles.textHeader}>Estamos tentando carregar a tela, por favor aguarde...</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    padding: 20,
  },
  imageCard: {
    width: "100%",
    height: 220,
    borderRadius: 15,
    resizeMode: "cover",
    marginBottom: 15,
  },
  textHeader: {
    textAlign: 'center',
    fontSize: 35,
    fontWeight: 'bold',
    color: '#1E90FF'
  },
  cardStyle: {
    backgroundColor: "#333333",
    borderRadius: 15,
    marginVertical: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 10
  },
  containerCard: {
    alignItems: 'center',
    marginTop: 10
  },
  nameCard: {
    fontSize: 26,
    color: "#1E90FF",
    fontWeight: "bold",
    marginBottom: 10,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  descriptionCard: {
    fontSize: 16,
    color: "#f0f0f0",
    lineHeight: 22,
    marginBottom: 10,
    alignSelf: 'flex-start'
  },
  detailCard: {
    fontSize: 14,
    color: "#a0a0a0",
    marginBottom: 4,
    alignSelf: 'flex-start'
  },
  inputTextSearch: {
    height: 40,
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
    color: '#fff',
  },
});

export default Protista;
