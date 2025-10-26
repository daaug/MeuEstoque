import { useEffect, useState } from "react";
import { Modal, View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Database from "../database/EstoqueDatabase";

interface ModalProps {
    visible: boolean;
    closeModal: () => void;
    reloadSales: () => void;
    id: string;
    clientId: string;
    productId: string;
    value: string;
    date: string;
    isNew: boolean;
}

export default function NewSale({visible, closeModal, reloadSales, id, clientId, productId, value, date, isNew}: ModalProps) {

    const [saleId, setSaleId] = useState(id);
    const [saleClientId, setSaleClientId] = useState(clientId);
    const [saleProductId, setSaleProductId] = useState(productId);
    const [saleValue, setSaleValue] = useState(value);
    const [saleDate, setSaleDate] = useState(date);

    useEffect(() => {
		setSaleId(id);
		setSaleClientId(clientId);
		setSaleProductId(productId);
		setSaleValue(value);
		setSaleDate(date);
    }, [id, clientId, productId, value, date]);

    return (
        <Modal 
            visible={visible}
            animationType="fade"
            transparent={true}
        >
            <View style={styles.viewContainer}>
                <View style={styles.viewElements}>
                    <View>
                        <Text style={styles.campoTitulo}>Valor da Venda:</Text>
                        <TextInput style={styles.input}
							inputMode="numeric"
                            placeholder="Insira o valor da venda"
                            value={saleValue}
                            onChangeText={setSaleValue}
                        />
                    </View>

                    <View>
                        <Text style={styles.campoTitulo}>Data da Venda (ex: dia/mes/ano):</Text>
                        <TextInput style={styles.input}
                            placeholder="Insira a data da venda"
                            value={saleDate}
                            onChangeText={setSaleDate}
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
                                const updateOrInsertItem = () => {
                                    if (isNew){
                                        Database.insertSale(parseInt(saleClientId), parseInt(saleProductId), parseFloat(saleValue), saleDate).then(() => {
                                            reloadSales();
                                            closeModal();
                                        });
                                    } else {
                                        Database.updateSale(parseInt(saleClientId), parseInt(saleProductId), parseFloat(saleValue), saleDate).then(() => {
                                            reloadSales();
                                            closeModal();
                                        });
                                    }
                                }

                                updateOrInsertItem();
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
