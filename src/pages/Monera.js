import React, { useEffect, useState } from 'react'; 
import { Text, SafeAreaView, FlatList, View, Image, TextInput, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { globalStyles } from '../styles/global';

const Monera = () => {
  
  const [monera, setMonera] = useState([]); 
  const [filteredMonera, setFilteredMonera] = useState([]); // Estado para armazenar os dados filtrados
  const [searchQuery, setSearchQuery] = useState(''); // Estado para armazenar o valor do campo de busca

  useEffect(() => {
    axios.get("http://192.168.0.10:3000/monera")
      .then((response) => {
        setMonera(response.data);
        setFilteredMonera(response.data); // Inicialmente, exibe todos os dados
      })
      .catch((err) => {
        console.error(err);
        Alert.alert("Erro ao buscar os dados");
      });
  }, []); 

  // Função para filtrar os dados com base no campo de busca
  const handleSearch = (query) => {
    setSearchQuery(query); // Atualiza o estado da busca
    if (query) {
      const filteredData = monera.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMonera(filteredData); // Atualiza a lista filtrada
    } else {
      setFilteredMonera(monera); // Mostra todos os itens se a busca estiver vazia
    }
  };

  const renderItem = ({ item }) => (
    <View style={globalStyles.cartao}>
      <Image source={{ uri: item.image }} style={globalStyles.imagemCartao} />
      <View style={globalStyles.conteudoCartao}>
        <Text style={globalStyles.nomeCartao}>{item.name}</Text>
        <Text style={globalStyles.descricaoCartao}>{item.description}</Text>
        <Text style={globalStyles.detalheCartao}>Nutrição: {item.nutrition}</Text>
        <Text style={globalStyles.detalheCartao}>Respiração: {item.respiration}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={globalStyles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar por nome..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredMonera} // Usa a lista filtrada
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: '#FFFFFF', // Define o texto branco
  },
});

export default Monera;
