import React, { useState, useEffect } from "react"; 
import {globalStyles} from "../styles/global";
import {
  Text,
  SafeAreaView,
  FlatList,
  View,
  Image,
  Alert,
  TextInput,
} from "react-native";
import axios from "axios";

const Plantas = () => {
  const [plantas, setPlantas] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://192.168.112.26:3000/plantas")
      .then((response) => {
        setPlantas(response.data);
      })
      .catch(() => {
        Alert.alert("tempo encerrado");
      });
  }, []);

  const plantasItem = ({ item }) => (
    <View style={globalStyles.cartao}>
      <Image source={{ uri: item.image }} style={globalStyles.imagemCartao} />
      <View style={globalStyles.conteudoCartao}>
        <Text style={globalStyles.nomeCartao}>{item.name}</Text>
        <Text style={globalStyles.descricaoCartao}>{item.description}</Text>
        <Text style={globalStyles.detalheCartao}>Nutrição: {item.nutrition}</Text>
        <Text style={globalStyles.detalheCartao}>Respiração: {item.respiration}</Text>
        <Text style={globalStyles.detalheCartao}>
          Tipo de Célula: {item.cellType}
        </Text>
        <Text style={globalStyles.detalheCartao}>
          Organização Celular: {item.cellOrganization}
        </Text>
        <Text style={globalStyles.detalheCartao}>
          Reprodução: {item.reproduction}
        </Text>
      </View>
    </View>
  );

  const filteredPlantas = plantas.filter((item) => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={globalStyles.container}>
      {/* Search Input */}
      <TextInput
        style={globalStyles.searchInput}
        placeholder="Search for plants"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      
      {/* Plant List */}
      <FlatList
        data={filteredPlantas}
        renderItem={plantasItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

export default Plantas;