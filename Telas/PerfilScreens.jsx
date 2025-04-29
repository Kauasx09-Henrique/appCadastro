import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  Modal,
  Portal,
  PaperProvider,
  Button,
  Avatar,
} from "react-native-paper";

const ProfileScreen = ({ navigation }) => {
  const [usuario, setUsuario] = useState(null);
  const [visible, setVisible] = useState(false);

  // Estados para edição
  const [editNome, setEditNome] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editTelefone, setEditTelefone] = useState("");

  useEffect(() => {
    const carregarUsuario = async () => {
      try {
        const usuarioSalvo = await AsyncStorage.getItem("usuario");
        if (usuarioSalvo) {
          setUsuario(JSON.parse(usuarioSalvo));
        }
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
      }
    };

    carregarUsuario();
  }, []);

  const showModal = () => {
    if (usuario) {
      setEditNome(usuario.nome);
      setEditEmail(usuario.email);
      setEditTelefone(usuario.numeroTel);
      setVisible(true);
    }
  };

  const hideModal = () => setVisible(false);

  const salvarEdicoes = async () => {
    try {
      const usuarioAtualizado = {
        ...usuario,
        nome: editNome,
        email: editEmail,
        numeroTel: editTelefone,
      };

      await AsyncStorage.setItem("usuario", JSON.stringify(usuarioAtualizado));
      setUsuario(usuarioAtualizado);
      hideModal();
      Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar as alterações");
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("usuario");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  if (!usuario) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }
  console.log(usuario.genero);
  let foto = require("../assets/Avatar.icon.men.png");
  if (usuario.genero === "Feminino") {
    foto = require("../assets/Avatar.icon.woman.png");
  }

  return (
    <PaperProvider>
      <View style={styles.container}>
        <View style={styles.header}>
          <Avatar.Image size={120} margin={25} source={foto}></Avatar.Image>
          <Text style={styles.nome}>{usuario.nome}</Text>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Icon name="email" size={24} color="#666" style={styles.icon} />
            <Text style={styles.infoText}>{usuario.email}</Text>
          </View>

          <View style={styles.infoItem}>
            <Icon name="phone" size={24} color="#666" style={styles.icon} />
            <Text style={styles.infoText}>{usuario.numeroTel}</Text>
          </View>

          {usuario.endereco && (
            <>
              <View style={styles.infoItem}>
                <Icon
                  name="map-marker"
                  size={24}
                  color="#666"
                  style={styles.icon}
                />
                <Text style={styles.infoText}>
                  {usuario.endereco.logradouro}, {usuario.endereco.bairro}
                </Text>
              </View>
              <View style={styles.infoItem}>
                <Icon name="city" size={24} color="#666" style={styles.icon} />
                <Text style={styles.infoText}>
                  {usuario.endereco.localidade} - {usuario.endereco.uf}
                </Text>
              </View>
            </>
          )}
        </View>

        <TouchableOpacity style={styles.editButton} onPress={showModal}>
          <Text style={styles.editButtonText}>Editar Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>

        {/* Modal de Edição */}
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.modalContainer}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Editar Perfil</Text>

              <View style={styles.modalInputContainer}>
                <TextInput
                  style={styles.modalInput}
                  value={editNome}
                  onChangeText={setEditNome}
                  placeholder="Nome"
                />
              </View>

              <View style={styles.modalInputContainer}>
                <Icon name="email" size={20} color="#666" style={styles.icon} />
                <TextInput
                  style={styles.modalInput}
                  value={editEmail}
                  onChangeText={setEditEmail}
                  placeholder="Email"
                  keyboardType="email-address"
                />
              </View>

              <View style={styles.modalInputContainer}>
                <Icon name="phone" size={20} color="#666" style={styles.icon} />
                <TextInput
                  style={styles.modalInput}
                  value={editTelefone}
                  onChangeText={setEditTelefone}
                  placeholder="Telefone"
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.modalButtons}>
                <Button
                  mode="outlined"
                  onPress={hideModal}
                  style={styles.modalButton_1}
                  textColor="black"
                >
                  Cancelar
                </Button>
                <Button
                  mode="contained"
                  onPress={salvarEdicoes}
                  style={styles.modalButton_2}
                >
                  Salvar
                </Button>
              </View>
            </View>
          </Modal>
        </Portal>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
    paddingTop: 20,
  },
  nome: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    color: "#2c3e50",
  },
  infoContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  icon: {
    marginRight: 15,
    width: 24,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  editButton: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#e74c3c",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    width: "90%",
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  modalInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  modalInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  modalButton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "#44749d",
  },
  modalButton_1: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "#e2e3d9",
  },
  modalButton_2: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "#44749d",
    color: "white",
  },
});

export default ProfileScreen;
