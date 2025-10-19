import { useState } from "react";
import { Modal, View, Text, StyleSheet, Button, TextInput, TouchableOpacity } from "react-native";
import Database from "../database/initializeDatabase";

interface ModalProps {
    visible: boolean;
    closeModal: () => void;
}

export default function NewSection({visible, closeModal}: ModalProps) {
    const [sectionTitle, setSectionTitle] = useState('');
    return (
        <Modal 
            visible={visible}
            animationType="fade"
            transparent={true}
        >
            <View style={styles.viewContainer}>
                <View style={styles.viewElements}>
                    <View>
                        <Text style={styles.campoTitulo}>Nome da nova Seção:</Text>
                        <TextInput style={styles.input}
                            placeholder="Insira o nome da Nova Seção"
                            value={sectionTitle}
                            onChangeText={setSectionTitle}
                        />
                    </View>

                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.btnCancel} onPress={() => {
                            setSectionTitle('');
                            closeModal();
                        }}>
                            <Text style={styles.textCancel}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btnSave}
                            onPress={() => {
                                // DO NOT ALLOW a new element being created if its exact
                                // name is already in use
                                let result: string;
                                const getSectionName = async () => {
                                    const data = await Database.getSectionByName(sectionTitle.trim());
                                    result = data.name;
                                }
                                getSectionName().then(() => {
                                    if (result !== sectionTitle.trim()) {
                                        Database.insertSection(sectionTitle.trim());
                                    }
                                    setSectionTitle('');
                                    closeModal();
                                });
                            }}
                        >
                            <Text style={styles.textSave}>Salvar</Text>
                        </TouchableOpacity>
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
        backgroundColor: '#cacaca99',
    },
    viewElements: {
        backgroundColor: '#ffffff',
        borderColor: '#000000',
        borderRadius: 12,
        borderWidth: 2,
        gap: 15,
        //height: '20%',
        justifyContent: 'space-between',
        padding: 5,
        width: '95%',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btnCancel: {
        backgroundColor: 'none',
        borderWidth: 2,
        borderColor: 'red',
        padding: 5,
    },
    btnSave: {
        backgroundColor: 'none',
        color: 'black',
        borderWidth: 2,
        borderColor: 'black',
        padding: 5,
    },
    textCancel: {
        fontWeight: 'bold',
        fontSize: 22,
        color: 'black',
    },
    textSave: {
        fontWeight: 'bold',
        fontSize: 22,
        color: 'black',
    },
    campoTitulo: {
        fontWeight: 'bold',
        fontSize: 22,
    },
    input: {
        borderColor: '#000000',
        borderWidth: 1,
        fontSize: 22,
    },
});
