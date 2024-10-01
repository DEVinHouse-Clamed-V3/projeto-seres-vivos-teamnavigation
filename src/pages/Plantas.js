import React, { useState, useEffect } from "react"; 
import {globalStyles} from "../styles/global";
import {
  Text,
  SafeAreaView,
  FlatList,
  View,
  Image,
  Alert,
} from "react-native";
import axios from "axios";

const Plantas = () => {
  const [plantas, setPlantas] = useState([]);

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

  return (
    <SafeAreaView style={globalStyles.container}>
      <FlatList
        data={plantas}
        renderItem={plantasItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};


export default Plantas;