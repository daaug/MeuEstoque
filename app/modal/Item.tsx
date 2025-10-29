import { useEffect, useState } from "react";
import { Modal, View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import Database from "../database/EstoqueDatabase";

interface ModalProps {
    visible: boolean;
    closeModal: () => void;
    reloadItems: () => void;
    reloadSections: () => void;
	db: Database;
    id: string;
    name: string;
    value: string;
    measure: string;
    sectionId: string;
    isNew: boolean;
}

export default function NewItem({visible, closeModal, reloadItems, db, id, name, value, measure, sectionId, isNew}: ModalProps) {

    const [itemName, setItemName] = useState(name);
    const [itemValue, setItemValue] = useState(value);
    const [itemId, setItemId] = useState(id);
    const [radioButtonSelected, setRadioButtonSelected] = useState(measure);
    const [radioButtonSelectedText, setRadioButtonSelectedText] = useState('gramas');

    useEffect(() => {
        setItemId(id);
        setItemName(name);
        setItemValue(value);
        setRadioButtonSelected(measure);
    }, [id, name, value, measure, sectionId]);

    return (
        <Modal 
            visible={visible}
            animationType="fade"
            transparent={true}
        >
            <View style={styles.viewContainer}>
                <View style={styles.viewElements}>
                    <View>
                        <Text style={styles.campoTitulo}>Nome do Item:</Text>
                        <TextInput style={styles.input}
                            placeholder="Insira o nome do item"
                            value={itemName}
                            onChangeText={setItemName}
                        />
                    </View>

                    <View>
                        <Text style={styles.campoTitulo}>Unidade de Medida:</Text>
                        <TouchableOpacity
                            style={styles.radioBox}
                            onPress={() => {setRadioButtonSelected('g'); setRadioButtonSelectedText('gramas')}}
                        >
                            <MaterialIcons name={radioButtonSelected === 'g' ? "radio-button-on" : "radio-button-off"} size={25} color="#000000" />
                            <Text>gramas</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.radioBox}
                            onPress={() => {setRadioButtonSelected('ml'); setRadioButtonSelectedText('mililitros')}}
                        >
                            <MaterialIcons name={radioButtonSelected === 'ml' ? "radio-button-on" : "radio-button-off"} size={25} color="#000000" />
                            <Text>mililitros</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.radioBox}
                            onPress={() => {setRadioButtonSelected('un'); setRadioButtonSelectedText('unidades')}}
                        >
                            <MaterialIcons name={radioButtonSelected === 'un' ? "radio-button-on" : "radio-button-off"} size={25} color="#000000" />
                            <Text>unidades</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text style={styles.campoTitulo}>Quantidade em {radioButtonSelectedText}:</Text>
                        <TextInput style={styles.input}
                            keyboardType="numeric"
                            value={itemValue}
                            onChangeText={setItemValue}
                        />
                    </View>

                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.btnCancel} onPress={() => {
                            closeModal();
                        }}>
                            <Text style={styles.textCancel}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btnSave}
                            onPress={async () => {
                                    if (isNew){
                                        await db.insertItem(itemName, parseInt(itemValue) || 0, radioButtonSelected, parseInt(sectionId)).then(() => {
                                            reloadItems();
                                            closeModal();
                                        });
                                    } else {
                                        await db.updateItem(parseInt(itemId), itemName, parseInt(itemValue) || 0, radioButtonSelected).then(() => {
                                            reloadItems();
                                            closeModal();
                                        });
                                    }

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
