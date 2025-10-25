import { useEffect, useState } from "react";
import { Modal, View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Database from "../database/EstoqueDatabase";

interface ModalProps {
    visible: boolean;
    closeModal: () => void;
    reloadClients: () => void;
    name: string;
    id: string;
    isNew: boolean;
}

export default function NewClient({visible, closeModal, reloadClients, name, id, isNew}: ModalProps) {
    const [clientName, setClientName] = useState(name);
    const [clientId, setClientId] = useState(id);

    useEffect(() => {
        setClientName(name)
        setClientId(id)
    }, [name, id]);

    return (
        <Modal 
            visible={visible}
            animationType="fade"
            transparent={true}
        >
            <View style={styles.viewContainer}>
                <View style={styles.viewElements}>
                    <View>
                        <Text style={styles.campoTitulo}>Nome do Cliente:</Text>
                        <TextInput style={styles.input}
                            placeholder="Insira o nome do Cliente"
                            value={clientName}
                            onChangeText={setClientName}
                        />
                    </View>

                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.btnCancel} onPress={() => {
                            closeModal();
                        }}>
                            <Text style={styles.textCancel}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btnSave}
                            onPress={() => {
                                const updateOrInsertClient = () => {
                                    if (isNew){
                                        Database.insertClient(clientName).then(() => {
                                            reloadClients();
                                            closeModal();
                                        });
                                    } else {
                                        Database.updateClient(parseInt(clientId), clientName).then(() => {
                                            reloadClients();
                                            closeModal();
                                        });
                                    }
                                }

                                updateOrInsertClient();
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
