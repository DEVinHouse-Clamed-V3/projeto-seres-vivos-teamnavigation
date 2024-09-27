import React, { useEffect, useState } from 'react'; 
// Importa o React e dois hooks importantes: useEffect (para realizar efeitos colaterais, como chamadas de API) e useState (para gerenciar o estado).

import { Text, SafeAreaView, FlatList, View, Image, StyleSheet, Alert } from 'react-native';
// Importa componentes nativos do React Native para renderizar UI: Text, SafeAreaView, FlatList, View, Image, StyleSheet, e Alert.

import axios from 'axios';
// Importa o axios para fazer chamadas HTTP, que será usado para buscar dados da API.

import { globalStyles } from '../styles/global';
// Importa estilos globais do arquivo 'global.js', que contém as definições de estilo usadas no projeto.

const Monera = () => {
  
  const [monera, setMonera] = useState([]); 
  // Declara uma variável de estado chamada 'monera' com o valor inicial como um array vazio. 
  // 'setMonera' é a função usada para atualizar esse estado.

  useEffect(() => {
    // useEffect é um hook que executa efeitos colaterais após o componente ser montado.
    // Neste caso, ele é usado para fazer uma chamada à API ao carregar o componente.

    axios.get("http://192.168.0.10:3000/monera") 
    // Faz uma requisição GET à API, buscando dados do endpoint "http://192.168.0.10:3000/monera".

      .then((response) => {
        setMonera(response.data);
        // Quando a requisição é bem-sucedida, armazena os dados recebidos no estado 'monera'.
      })
      .catch((err) => {
        console.error(err);
        Alert.alert("Erro ao buscar os dados");
        // Se houver algum erro na requisição, exibe um alerta de erro para o usuário.
      });
  }, []); 
  // O array vazio [] como segundo argumento indica que o efeito será executado apenas uma vez, após a montagem do componente (componentDidMount).

  const renderItem = ({ item }) => (
    // Função para renderizar cada item da lista de forma customizada.
    
    <View style={globalStyles.cartao}>
      {/* Cada item é envolvido em um "View", que atua como um container. O estilo 'cartao' define a aparência geral do card. */}

      <Image source={{ uri: item.image }} style={globalStyles.imagemCartao} />
      {/* Exibe uma imagem do item usando o link fornecido no objeto 'item.image'. O estilo 'imagemCartao' define o tamanho e layout da imagem. */}

      <View style={globalStyles.conteudoCartao}>
        {/* Este 'View' organiza o conteúdo textual do card em uma coluna, colocando nome, descrição, nutrição e respiração um abaixo do outro. */}

        <Text style={globalStyles.nomeCartao}>{item.name}</Text>
        {/* Exibe o nome do item com estilo personalizado (nomeCartao). */}

        <Text style={globalStyles.descricaoCartao}>{item.description}</Text>
        {/* Exibe a descrição do item com estilo personalizado (descricaoCartao). */}

        <Text style={globalStyles.detalheCartao}>Nutrição: {item.nutrition}</Text>
        {/* Exibe o tipo de nutrição do item. */}

        <Text style={globalStyles.detalheCartao}>Respiração: {item.respiration}</Text>
        {/* Exibe o tipo de respiração do item. */}
      </View>
    </View>
  );
  // A função renderItem renderiza um card com imagem, nome, descrição, nutrição e respiração para cada item na lista 'monera'.

  return (
    <SafeAreaView style={globalStyles.container}>
      {/* SafeAreaView garante que o conteúdo do aplicativo não se sobreponha a elementos de sistema como barras de status em dispositivos mais novos. */}
      
      <FlatList
        data={monera}
        // A fonte de dados da FlatList é o estado 'monera', que contém os itens retornados pela API.

        renderItem={renderItem}
        // Define como cada item será renderizado usando a função renderItem.

        keyExtractor={(item) => item.id}
        // Define uma chave única para cada item da lista, baseado no campo 'id', que ajuda a otimizar a renderização.
      />
    </SafeAreaView>
  );
  // O retorno da função exibe uma FlatList que renderiza a lista de itens 'monera' de forma segura na tela usando SafeAreaView.
};

export default Monera;
// Exporta o componente Monera para que possa ser usado em outras partes do aplicativo.
