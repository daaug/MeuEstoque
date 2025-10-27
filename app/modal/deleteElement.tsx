import { useEffect, useState } from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Database from "../database/EstoqueDatabase";

interface ModalProps {
    visible: boolean;
    closeModal: () => void;
	loaders: Record<string, any>;
    id: string;
    name: string;
    type: string;
}

export default function DeleteElement({visible, closeModal, loaders, name, id, type}: ModalProps) {
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
                        <Text style={styles.campoTitulo}>{elementType === 'sale' ? `Venda de ${elementName}` : elementName}</Text>
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
									switch (elementType) {
										case 'section':
											Database.deleteSection(parseInt(elementId)).then(() => {
												//reloadChildren();
												//reloadParents();
												loaders.loadSections();
												closeModal();
											});
										break;
										case 'item':
											Database.deleteItem(parseInt(elementId)).then(() => {
												//reloadChildren();
												//reloadParents();
												loaders.loadItems();
												closeModal();
											});
										break;
										case 'client':
											Database.deleteClient(parseInt(elementId)).then(() => {
												//reloadChildren();
												//reloadParents();
												loaders.loadClients();
												closeModal();
											});
										break;
										case 'product':
											Database.deleteProduct(parseInt(elementId)).then(() => {
												//reloadChildren();
												//reloadParents();
												loaders.loadProducts();
												closeModal();
											});
										break;
										case 'sale':
											Database.deleteSale(parseInt(elementId)).then(() => {
												//reloadChildren();
												//reloadParents();
												loaders.loadSales();
												closeModal();
											});
										break;
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
