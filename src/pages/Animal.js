import React, { useState, useEffect } from "react";
import {
  Text,
  SafeAreaView,
  FlatList,
  View,
  Image,
  Alert,
  StyleSheet,
} from "react-native";
import axios from "axios";

const Animal = () => {
  const [animal, setAnimal] = useState([]);

  useEffect(() => {
    axios
      .get("http://192.168.3.5:3000/animais") // Seu endpoint
      .then((response) => {
        setAnimal(response.data);
      })
      .catch(() => {
        Alert.alert("perdeu tempo ಥ_ಥ");
      });
  }, []);

  const animalItem = ({ item }) => (
    <View style={styles.cartao}>
      <Image source={{ uri: item.image }} style={styles.imagemCartao} />
      <View style={styles.conteudoCartao}>
        <Text style={styles.nomeCartao}>{item.name}</Text>
        <Text style={styles.descricaoCartao}>{item.description}</Text>
        <Text style={styles.detalheCartao}>Nutrição: {item.nutrition}</Text>
        <Text style={styles.detalheCartao}>Respiração: {item.respiration}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={animal}
        renderItem={animalItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
  cartao: {
    backgroundColor: "#1c1c1e",
    borderRadius: 15,
    marginVertical: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  imagemCartao: {
    width: "100%",
    height: 220,
    borderRadius: 15,
    resizeMode: "cover",
    marginBottom: 15,
  },
  conteudoCartao: {
    marginTop: 10,
  },
  nomeCartao: {
    fontSize: 26,
    color: "#FF4C4C",
    fontWeight: "bold",
    marginBottom: 10,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  descricaoCartao: {
    fontSize: 16,
    color: "#f0f0f0",
    lineHeight: 22,
    marginBottom: 10,
  },
  detalheCartao: {
    fontSize: 14,
    color: "#a0a0a0",
    marginBottom: 5,
  },
});

export default Animal;
