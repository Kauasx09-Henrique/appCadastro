import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Card, Modal } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import { mask } from "remask";

export default function CadastroScreen({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [numeroTel, setNumeroTel] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState(null);

  // Mascarando numero de telefone

  const handlePhonechange = (text) => {
    const masked = mask(text, ["(99) 99999-9999", "(99) 99999-9999"]);
    setNumeroTel(masked);
  };

  //Api de buscar Cep

  const buscarCep = async () => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      setEndereco(response.data);
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      setEndereco(null);
      Alert.alert("Erro", "CEP não encontrado ou inválido");
    }
  };

  // Salvando cadastro do usuario

  const salvarCadastro = async () => {
    if (!nome || !email || !numeroTel || !senha || !cep) {
      Alert.alert("Atenção", "Por favor, preencha todos os campos");
      return;
    }

    //Inserindo dados dentro do Banco de dados(Local)

    try {
      await AsyncStorage.setItem(
        "usuario",
        JSON.stringify({ nome, email, numeroTel, senha, cep, endereco })
      );
      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
      navigation.navigate("Perfil");
    } catch (e) {
      Alert.alert("Erro", "Não foi possível salvar os dados");
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
            onChangeText={handlePhonechange}
            keyboardType="phone-pad"
            maxLength={15}
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

        <View style={styles.inputContainer}>
          <Icon name="map-marker" size={20} color="#666" style={styles.icon} />
          <TextInput
            placeholder="CEP"
            placeholderTextColor="#999"
            style={styles.input}
            value={cep}
            onChangeText={setCep}
            keyboardType="number-pad"
            maxLength={8}
          />
          <TouchableOpacity onPress={buscarCep} style={styles.cepButton}>
            <Text style={styles.cepButtonText}>Buscar</Text>
          </TouchableOpacity>
        </View>

        {endereco && !endereco.erro && (
          <View style={styles.enderecoContainer}>
            <Text style={styles.enderecoText}>
              Logradouro: {endereco.logradouro}
            </Text>
            <Text style={styles.enderecoText}>Bairro: {endereco.bairro}</Text>
            <Text style={styles.enderecoText}>Cidade: {endereco.localidade}</Text>
            <Text style={styles.enderecoText}>Estado: {endereco.uf}</Text>
          </View>
        )}

        <Button
          mode="contained"
          onPress={salvarCadastro}
          style={styles.button}
          labelStyle={styles.buttonText}
          contentStyle={styles.buttonContent}
        >
          Cadastrar
        </Button>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginText}>
            Já tem uma conta? <Text style={styles.loginLink}>Faça login</Text>
          </Text>
        </TouchableOpacity>

      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 30,
      backgroundColor: "#f8f9fa",
    },
    titulo: {
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 5,
      color: "#2c3e50",
      textAlign: "center",
    },
    subtitulo: {
      fontSize: 14,
      marginBottom: 30,
      color: "#7f8c8d",
      textAlign: "center",
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#fff",
      borderRadius: 25,
      paddingHorizontal: 15,
      marginBottom: 15,
      elevation: 2,
      shadowColor: "#000",
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
      color: "#333",
    },
    cepButton: {
      padding: 10,
      backgroundColor: "#3498db",
      borderRadius: 5,
      marginLeft: 10,
    },
    cepButtonText: {
      color: "#fff",
    },
    enderecoContainer: {
      backgroundColor: "#fff",
      padding: 15,
      borderRadius: 10,
      marginBottom: 15,
    },
    enderecoText: {
      color: "#333",
      marginBottom: 5,
    },
    button: {
      marginTop: 20,
      borderRadius: 25,
      paddingVertical: 5,
      backgroundColor: "#3498db",
      elevation: 3,
    },
    buttonText: {
      fontSize: 16,
      color: "#fff",
    },
    buttonContent: {
      height: 50,
    },
    loginText: {
      marginTop: 20,
      textAlign: "center",
      color: "#7f8c8d",
    },
    loginLink: {
      color: "#3498db",
      fontWeight: "bold",
    },
  
  });
