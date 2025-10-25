import { useEffect, useState } from "react";
import { Modal, View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Database from "../database/EstoqueDatabase";

interface ModalProps {
    visible: boolean;
    closeModal: () => void;
    reloadProducts: () => void;
    id: string;
    clientId: string;
    name: string;
    isNew: boolean;
}

export default function NewProduct({visible, closeModal, reloadProducts, id, clientId, name, isNew}: ModalProps) {

    const [productClientId, setProductClientId] = useState(clientId);
    const [productId, setProductId] = useState(id);
    const [productName, setProductName] = useState(name);

    useEffect(() => {
        setProductClientId(clientId);
        setProductId(id);
        setProductName(name);
    }, [clientId, id, name]);
	console.log(productClientId);

    return (
        <Modal 
            visible={visible}
            animationType="fade"
            transparent={true}
        >
            <View style={styles.viewContainer}>
                <View style={styles.viewElements}>
                    <View>
                        <Text style={styles.campoTitulo}>Nome do Produto:</Text>
                        <TextInput style={styles.input}
                            placeholder="Insira o nome do produto"
                            value={productName}
                            onChangeText={setProductName}
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
                                const updateOrInsertProduct = () => {
                                    if (isNew){
                                        Database.insertProduct(productName, parseInt(productClientId)).then(() => {
                                            reloadProducts();
                                            closeModal();
                                        });
                                    } else {
                                        Database.updateProduct(parseInt(productId), productName).then(() => {
                                            reloadProducts();
                                            closeModal();
                                        });
                                    }
                                }

                                updateOrInsertProduct();
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
        borderRadius: 10,
        fontSize: 22,
    },
    radioBox: {
        flexDirection: 'row',
        gap: 20,
    }
});
