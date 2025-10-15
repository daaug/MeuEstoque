import { useState } from "react";
import { Modal, View, Text, StyleSheet, Button } from "react-native";
import Input from "../components/Input";

interface ModalProps {
  visible: boolean;
  closeModal: () => void;
}

export default function NewSection({visible, closeModal}: ModalProps) {
  return (
    <Modal 
      visible={visible}
      animationType="fade"
      transparent={true}
    >
      <View style={styles.viewContainer}>
        <View style={styles.viewElements}>
          <View>
            <Text>Nome da Seção:</Text>
            <Input />
          </View>

          <View style={styles.buttons}>
            <Button title='Cancelar' onPress={closeModal}/>
            <Button title='Salvar' />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#cacaca88',
  },
  viewElements: {
    backgroundColor: '#ffffff',
    borderColor: '#000000',
    borderRadius: 12,
    borderWidth: 2,
    gap: 15,
    height: '20%',
    justifyContent: 'space-between',
    padding: 5,
    width: '95%',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
