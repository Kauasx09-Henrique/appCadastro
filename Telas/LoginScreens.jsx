import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);


  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos');
      return;
    }

    try {
      const usuarioSalvo = await AsyncStorage.getItem('usuario');
      
      if (usuarioSalvo) {
        const usuario = JSON.parse(usuarioSalvo);
        
        if (usuario.email === email && usuario.senha === senha) {
          navigation.navigate('Perfil');
        } else {
          Alert.alert('Erro', 'E-mail ou senha incorretos');
        }
      } else {
        Alert.alert('Erro', 'Nenhum usuário cadastrado encontrado');
      }
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível fazer login');
    }
  };

  return (
    <View style={styles.container}>
      <Avatar.Image size={120} margin={25} style={styles.imagem} source={require('../assets/Avatar.icon.men.png')}></Avatar.Image>
      <Text style={styles.titulo}>Bem-vindo de volta</Text>
      <Text style={styles.subtitulo}>Faça login para continuar</Text>

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

      <TouchableOpacity onPress={() => navigation.navigate('RecuperarSenha')}>
        <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
      </TouchableOpacity>

      <Button
        mode="contained"
        onPress={handleLogin}
        style={styles.button}
        labelStyle={styles.buttonText}
        contentStyle={styles.buttonContent}
      >
        Entrar
      </Button>

      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.registerText}>
          Não tem uma conta? <Text style={styles.registerLink}>Cadastre-se</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#f8f9fa',
    alignItems: 'center'
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
  forgotPassword: {
    textAlign: 'right',
    color: '#3498db',
    marginBottom: 20,
    fontFamily: 'Poppins-Regular',
  },
  registerText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#7f8c8d',
    fontFamily: 'Poppins-Regular',
  },
  registerLink: {
    color: '#3498db',
    fontWeight: 'bold',
  },

});