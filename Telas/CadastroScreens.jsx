// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   Alert,
//   TouchableOpacity,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Button, Card, RadioButton } from "react-native-paper";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import axios from "axios";
// import { mask } from "remask";
// import * as SQlite from 'expo-sqlite/legacy';

// // Criando banco de dedos

// const db = SQlite.openDataDatabase('pessoas.db');

// export default class App extends Component{
//   constructor(props) {
//     super(props);
//     this.state = {
//       nome: '',
//       email: '',
//       numeroTel: '',
//       senha: '',
//       cep: '',
//       endereco: '',
//       genero: '',
//       pessoas: [],
//       editandoId: null,
//     };

//   }

//   criarTabelaPessoas = () => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         `CREATE TABLE IF NOT EXISTS pessoas (
//       id INTEGER PRIMARY KEY AUTOINCREMENT, 
//       nome TEXT NOT NULL,
//       email TEXT NOT NULL,
//       numeroTel INTEGER NOT NULL,
//       senha TEXT NOT NULL,
//       cep INTEGER NOT NULL,
//       endereco TEXT NOT NULL,
//       genero TEXT  NOT NULL
//         );`,
//         [],
//         () => {
//           console.log("Tabela pessoas criada com sucesso.");
//         },
//         (_, error) => {
//           console.log("Erro ao criar tabela pessoas", error);
//           return false;
//         }
//       );
//     });
//   };

//   cadastrarOuEditarPessoa = () => {
//     const { nome, email, numeroTel, senha, cep, endereco, genero } = this.state;

//       if (!nome || !email || !numeroTel || !senha || !cep || !genero) {
//         Alert.alert("Atenção", "Por favor, preencha todos os campos");
//         return;
//     }
//     if (editandoId === null) {
//       db.transaction((tx) => {
//         tx.executeSql(
//           (_, result) => {
//             Alert.alert('Sucesso', 'Pessoa cadastrada com sucesso!');
//             this.setState({ nome: '', idade: '' });
//             this.carregarPessoas();
//           },
//         )
//       })
//     }
//   }









// export default function CadastroScreen({ navigation }) {


  
//   // const [nome, setNome] = useState("");
//   // const [email, setEmail] = useState("");
//   // const [numeroTel, setNumeroTel] = useState("");
//   // const [senha, setSenha] = useState("");
//   // const [mostrarSenha, setMostrarSenha] = useState(false);
//   // const [cep, setCep] = useState("");
//   // const [endereco, setEndereco] = useState(null);
//   // const [genero, setgenero] = useState(null)

//   const notify = () => toast("muito facil");

//   //Function para criar alert

//   // const handleShowMessage = () => {
//   //   showMessage({
//   //     message: "Sucesso!",
//   //     description: "Cadastro realizado com sucesso.",
//   //     type: "success", // "danger", "info", "warning"
//   //     icon: "success",
//   //   });
//   // };




//   // Mascarando numero de telefone

//   const handlePhonechange = (text) => {
//     const masked = mask(text, ["(99) 99999-9999", "(99) 99999-9999"]);
//     setNumeroTel(masked);
//   };

//   //Api de buscar Cep

//   const buscarCep = async () => {
//     try {
//       const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
//       setEndereco(response.data);
//     } catch (error) {
//       console.error("Erro ao buscar CEP:", error);
//       setEndereco(null);
//       Alert.alert("Erro", "CEP não encontrado ou inválido");
//     }
//   };

//   // Salvando cadastro do usuario

 

//     //Inserindo dados dentro do Banco de dados(Local)

//     try {
//       await AsyncStorage.setItem(
//         "usuario",
//         JSON.stringify({ nome, email, numeroTel, senha, cep, endereco, genero })
//       );
//       Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
//       navigation.navigate("Perfil");
//     } catch (e) {
//       Alert.alert("Erro", "Não foi possível salvar os dados");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.titulo}>Crie sua conta</Text>
//       <Text style={styles.subtitulo}>Preencha seus dados para cadastro</Text>

//       <View style={styles.inputContainer}>
//         <Icon name="account" size={20} color="#666" style={styles.icon} />
//         <TextInput
//           placeholder="Nome completo"
//           placeholderTextColor="#999"
//           style={styles.input}
//           value={nome}
//           onChangeText={setNome}
//         />
//       </View>
      
//       <RadioButton.Group onValueChange={value => setgenero(value)} value={genero}>
//       <View style={styles.options}>
//         <RadioButton value="Masculino" />
//           <Text onPress={() => setgenero('Masculino')}>Masculino</Text> 
//         </View>

//         <View style={styles.options}>
//           <RadioButton value="Feminino" />
//           <Text onPress={() => setgenero('Feminino')}>Feminino</Text>
//         </View>
        
//       </RadioButton.Group>
//       <View style={styles.inputContainer}>
//         <Icon name="email" size={20} color="#666" style={styles.icon} />
//         <TextInput
//           placeholder="E-mail"
//           placeholderTextColor="#999"
//           style={styles.input}
//           value={email}
//           onChangeText={setEmail}
//           keyboardType="email-address"
//           autoCapitalize="none"
//           />
          
//         </View>


//       <View style={styles.inputContainer}>
//         <Icon name="phone" size={20} color="#666" style={styles.icon} />
//         <TextInput
//           placeholder="Telefone"
//           placeholderTextColor="#999"
//           style={styles.input}
//           value={numeroTel}
//           onChangeText={handlePhonechange}
//           keyboardType="phone-pad"
//           maxLength={15}
//         />
//       </View>

//       <View style={styles.inputContainer}>
//         <Icon name="lock" size={20} color="#666" style={styles.icon} />
//         <TextInput
//           placeholder="Senha"
//           placeholderTextColor="#999"
//           style={styles.input}
//           value={senha}
//           onChangeText={setSenha}
//           secureTextEntry={!mostrarSenha}
//           autoCapitalize="none"
//         />
//         <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
//           <Icon
//             name={mostrarSenha ? "eye-off" : "eye"}
//             size={20}
//             color="#666"
//             style={styles.iconEye}
//           />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.inputContainer}>
//         <Icon name="map-marker" size={20} color="#666" style={styles.icon} />
//         <TextInput
//           placeholder="CEP"
//           placeholderTextColor="#999"
//           style={styles.input}
//           value={cep}
//           onChangeText={setCep}
//           keyboardType="number-pad"
//           maxLength={8}
//         />
        
//         <TouchableOpacity onPress={buscarCep} style={styles.cepButton}>
//           <Text style={styles.cepButtonText}>Buscar</Text>
//         </TouchableOpacity>
//       </View>

//       {endereco && !endereco.erro && (
//         <View style={styles.enderecoContainer}>
//           <Text style={styles.enderecoText}>
//             Logradouro: {endereco.logradouro}
//           </Text>
//           <Text style={styles.enderecoText}>Bairro: {endereco.bairro}</Text>
//           <Text style={styles.enderecoText}>Cidade: {endereco.localidade}</Text>
//           <Text style={styles.enderecoText}>Estado: {endereco.uf}</Text>
//         </View>
//       )}

//       <Button
//         mode="contained"
//         onPress={salvarCadastro}
//         style={styles.button}
//         labelStyle={styles.buttonText}
//         contentStyle={styles.buttonContent}
//         onclick={notify} >Notificar! </Button>
 
        
        
    

//       <TouchableOpacity onPress={() => navigation.navigate("Login")}>
//         <Text style={styles.loginText}>
//           Já tem uma conta? <Text style={styles.loginLink}>Faça login</Text>
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     padding: 30,
//     backgroundColor: "#f8f9fa",
//   },
//   options: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//       marginBottom: 8, 
//   },
//   titulo: {
//     fontSize: 28,
//     fontWeight: "bold",
//     marginBottom: 5,
//     color: "#2c3e50",
//     textAlign: "center",
//   },
//   subtitulo: {
//     fontSize: 14,
//     marginBottom: 30,
//     color: "#7f8c8d",
//     textAlign: "center",
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     borderRadius: 25,
//     paddingHorizontal: 15,
//     marginBottom: 15,
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//   },
//   icon: {
//     marginRight: 10,
//   },
//   iconEye: {
//     marginLeft: 10,
//   },
//   input: {
//     flex: 1,
//     height: 50,
//     color: "#333",
//   },
//   cepButton: {
//     padding: 10,
//     backgroundColor: "#3498db",
//     borderRadius: 5,
//     marginLeft: 10,
//   },
//   cepButtonText: {
//     color: "#fff",
//   },
//   enderecoContainer: {
//     backgroundColor: "#fff",
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 15,
//   },
//   enderecoText: {
//     color: "#333",
//     marginBottom: 5,
//   },
//   button: {
//     marginTop: 20,
//     borderRadius: 25,
//     paddingVertical: 5,
//     backgroundColor: "#3498db",
//     elevation: 3,
//   },
//   buttonText: {
//     fontSize: 16,
//     color: "#fff",
//   },
//   buttonContent: {
//     height: 50,
//   },
//   loginText: {
//     marginTop: 20,
//     textAlign: "center",
//     color: "#7f8c8d",
//   },
//   loginLink: {
//     color: "#3498db",
//     fontWeight: "bold",
//   },
// });
