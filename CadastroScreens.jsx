import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CadastroScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [numeroTel, setNumeroTel] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const salvarCadastro = async () => {
    if (!nome || !email || !numeroTel || !senha) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos');
      return;
    }

    try {
      await AsyncStorage.setItem('usuario', JSON.stringify({ nome, email, numeroTel, senha }));
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigation.navigate('Perfil');
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível salvar os dados');
    }
  };

  return (

      <View style={styles.container}>
      
        
        <Text style={styles.titulo}>Crie sua conta</Text>
        <Text style={styles.subtitulo}>Preencha seus dados para cadastro</Text>

        <View style={styles.inputContainer}>
          <Icon name="account" size={20} color="#666" style={styles.icon} />
          <TextInput
            placeholder="Nome completo"
            placeholderTextColor="#999"
            style={styles.input}
            value={nome}
            onChangeText={setNome}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="email" size={20} color="#666" style={styles.icon} />
          <TextInput
            placeholder="E-mail"
            placeholderTextColor="#999"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="phone" size={20} color="#666" style={styles.icon} />
          <TextInput
            placeholder="Telefone"
            placeholderTextColor="#999"
            style={styles.input}
            value={numeroTel}
            onChangeText={setNumeroTel}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#666" style={styles.icon} />
          <TextInput
            placeholder="Senha"
            placeholderTextColor="#999"
            style={styles.input}
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={!mostrarSenha}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
            <Icon 
              name={mostrarSenha ? "eye-off" : "eye"} 
              size={20} 
              color="#666" 
              style={styles.iconEye} 
            />
          </TouchableOpacity>
        </View>

        <Button
          mode="contained"
          onPress={salvarCadastro}
          style={styles.button}
          labelStyle={styles.buttonText}
          contentStyle={styles.buttonContent}
        >
          Cadastrar
        </Button>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>
            Já tem uma conta? <Text style={styles.loginLink}>Faça login</Text>
          </Text>
        </TouchableOpacity>
      </View>

  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#f8f9fa',
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 30,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2c3e50',
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  subtitulo: {
    fontSize: 14,
    marginBottom: 30,
    color: '#7f8c8d',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  icon: {
    marginRight: 10,
  },
  iconEye: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#333',
    fontFamily: 'Poppins-Regular',
  },
  button: {
    marginTop: 20,
    borderRadius: 25,
    paddingVertical: 5,
    backgroundColor: '#3498db',
    elevation: 3,
  },
  buttonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#fff',
  },
  buttonContent: {
    height: 50,
  },
  loginText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#7f8c8d',
    fontFamily: 'Poppins-Regular',
  },
  loginLink: {
    color: '#3498db',
    fontWeight: 'bold',
  },
});