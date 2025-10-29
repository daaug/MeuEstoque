import { useEffect, useState } from "react";
import { Modal, View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Database from "../database/EstoqueDatabase";

interface ModalProps {
    visible: boolean;
    closeModal: () => void;
    reloadSales: () => void;
	db: Database
    id: string;
    clientId: string;
    productId: string;
    value: string;
    date: string;
    isNew: boolean;
}

export default function NewSale({visible, closeModal, reloadSales, db, id, clientId, productId, value, date, isNew}: ModalProps) {

    const [saleId, setSaleId] = useState('');
    const [saleClientId, setSaleClientId] = useState('');
    const [saleProductId, setSaleProductId] = useState('');
    const [saleValue, setSaleValue] = useState('');
    const [saleDay, setSaleDay] = useState('');
    const [saleMonth, setSaleMonth] = useState('');
    const [saleYear, setSaleYear] = useState('');

    useEffect(() => {
		setSaleId(id);
		setSaleClientId(clientId);
		setSaleProductId(productId);
		setSaleValue(value);
		setSaleDay(date.split('/')[0]);
		setSaleMonth(date.split('/')[1]);
		setSaleYear(date.split('/')[2]);
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
							inputMode="decimal"
                            placeholder="Insira o valor da venda"
                            value={saleValue}
                            onChangeText={setSaleValue}
                        />
                    </View>

					<Text style={styles.campoTitulo}>Data da Venda:</Text>
					<View style={styles.dateBox}>
						<View style={styles.dateBoxElements}>
							<Text style={styles.campoTitulo}>dia</Text>
							<TextInput style={styles.input}
								inputMode="numeric"
								value={saleDay}
								maxLength={2}
								onChangeText={setSaleDay}
							/>
						</View>
						<View style={styles.dateBoxElements}>
							<Text style={styles.campoTitulo}>mês</Text>
							<TextInput style={styles.input}
								inputMode="numeric"
								value={saleMonth}
								maxLength={2}
								onChangeText={setSaleMonth}
							/>
						</View>
						<View style={styles.dateBoxElements}>
							<Text style={styles.campoTitulo}>ano</Text>
							<TextInput style={styles.input}
								inputMode="numeric"
								value={saleYear}
								maxLength={4}
								onChangeText={setSaleYear}
							/>
						</View>

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
                                        db.insertSale(parseInt(saleClientId), parseInt(saleProductId), parseFloat(saleValue), `${saleDay}/${saleMonth}/${saleYear}`).then(() => {
                                            reloadSales();
                                            closeModal();
                                        });
                                    } else {
                                        db.updateSale(parseInt(saleClientId), parseInt(saleProductId), parseFloat(saleValue), `${saleDay}/${saleMonth}/${saleYear}`).then(() => {
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
    },
	dateBox: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: 20,
	},
	dateBoxElements: {
		flex: 1
	},
});
