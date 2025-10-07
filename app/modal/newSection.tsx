import { useState } from "react";
import { Modal, View, Text, StyleSheet, Button } from "react-native";
import Input from "../components/Input";

interface ModalProps {
  visible: boolean,
  closeModal: Function,
}

export default function NewSection({visible, closeModal}: ModalProps) {
  return (
    <Modal 
      visible={visible}
      animationType="fade"
      style={styles.container}
    >

      <Text>Nome da Seção:</Text>
      <Input />

      <View>
        <Button title='Cancelar' onPress={closeModal}/>
        <Button title='Salvar' />
      </View>

    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: '20%',
    width: '90%',
    borderRadius: 12,
    borderColor: '#000000',
    borderWidth: 2,
  }
});
