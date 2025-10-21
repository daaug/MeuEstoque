import { useEffect, useState } from "react";
import { Modal, View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Database from "../database/initializeDatabase";

interface ModalProps {
    visible: boolean;
    closeModal: () => void;
    reloadSections: () => void;
    reloadItems: () => void;
    id: string;
    name: string;
    type: string;
}

export default function DeleteElement({visible, closeModal, reloadSections, reloadItems, name, id, type}: ModalProps) {
    const [elementName, setElementName] = useState(name);
    const [elementId, setElementId] = useState(id);
    const [elementType, setElementType] = useState(type);

    useEffect(() => {
        setElementName(name)
        setElementId(id)
        setElementType(type)
    }, [name, id, type]);

    return (
        <Modal 
            visible={visible}
            animationType="fade"
            transparent={true}
        >
            <View style={styles.viewContainer}>
                <View style={styles.viewElements}>
                    <View style={styles.boxTitulo}>
                        <Text style={styles.campoTitulo}>Tem certeza que deseja remover:</Text>
                        <Text style={styles.campoTitulo}>{elementName}</Text>
                    </View>

                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.btnCancel} onPress={() => {
                            closeModal();
                        }}>
                            <Text style={styles.textCancel}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btnDeletar}
                            onPress={() => {
                                const deleteElement = async () => {
                                    if (elementType === 'section'){
                                        Database.deleteSection(parseInt(elementId)).then(() => {
                                            reloadItems();
                                            reloadSections();
                                            closeModal();
                                        });
                                    } else if (elementType === 'item'){
                                        Database.deleteItem(parseInt(elementId)).then(() => {
                                            reloadItems();
                                            reloadSections();
                                            closeModal();
                                        });
                                    }
                                }

                                deleteElement();
                            }}
                        >
                            <Text style={styles.textDeletar}>Deletar</Text>
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
    boxTitulo: {
        flexDirection: 'column',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btnCancel: {
        backgroundColor: 'none',
        borderWidth: 2,
        borderColor: 'black',
        padding: 5,
    },
    btnDeletar: {
        backgroundColor: 'none',
        color: 'black',
        borderWidth: 2,
        borderColor: 'red',
        padding: 5,
    },
    textCancel: {
        fontWeight: 'bold',
        fontSize: 22,
        color: 'black',
    },
    textDeletar: {
        fontWeight: 'bold',
        fontSize: 22,
        color: 'red',
    },
    campoTitulo: {
        fontWeight: 'bold',
        fontSize: 22,
    },
});
