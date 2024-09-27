
// INICIO ESTILIZAÇÃO Monera.js

import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  cartao: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,  // Para Android
    flexDirection: 'row',  // Mantém imagem e conteúdo em linha
    alignItems: 'flex-start', // Alinha no topo da imagem
  },
  imagemCartao: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginRight: 15,
    backgroundColor: '#ccc',
  },
  conteudoCartao: {
    flex: 1, // O conteúdo textual ocupará o restante do espaço ao lado da imagem
    flexDirection: 'column', // Organiza os textos um abaixo do outro
    justifyContent: 'flex-start', // Garante que o texto comece do topo
  },
  nomeCartao: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  descricaoCartao: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  detalheCartao: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,  // Pequeno espaçamento entre os detalhes
  },
});

// FIM ESTILIZAÇÃO Monera.js