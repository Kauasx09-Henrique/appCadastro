import React from 'react';
import { View, Button } from 'react-native';
import FlashMessage, { showMessage } from 'react-native-flash-message';

export default function Teste() {
  const handleShowMessage = () => {
    showMessage({
      message: "Sucesso!",
      description: "Cadastro realizado com sucesso.",
      type: "success", // "danger", "info", "warning"
      icon: "success",
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Mostrar Alerta" onPress={handleShowMessage} />
      <FlashMessage position="top" />
    </View>
  );
}
