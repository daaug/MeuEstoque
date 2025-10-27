import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, StatusBar, Platform } from 'react-native';
import Database from './database/EstoqueDatabase';
import NewClient from './modal/Client';
import NewProduct from './modal/Product';
import NewSale from './modal/Sale';
import DeleteElement from './modal/deleteElement';



export default function MinhasVendas() {

    const [isClientModalVisible, setIsClientModalVisible] = useState(false);
    const openClientModal = () => setIsClientModalVisible(true);
    const closeClientModal = () => {
        setIsClientModalVisible(false);
        setCurrClientId('');
        setCurrClientName('');
    }
    const [currClientId, setCurrClientId] = useState('');
    const [currClientName, setCurrClientName] = useState('');

    const [isProductModalVisible, setIsProductModalVisible] = useState(false);
    const openProductModal = () => setIsProductModalVisible(true);
    const closeProductModal = () => {
      setIsProductModalVisible(false);
      setCurrProductId('');
      setCurrProductName('');
    }
    const [currProductId, setCurrProductId] = useState('');
    const [currProductName, setCurrProductName] = useState('');

    const [isSaleModalVisible, setIsSaleModalVisible] = useState(false);
    const openSaleModal = () => setIsSaleModalVisible(true);
    const closeSaleModal = () => {
      setIsSaleModalVisible(false);
      setCurrSaleId('');
      setCurrSaleValue('');
      setCurrSaleDate('');
      setCurrProductId('');
      setCurrClientId('');
    }
    const [currSaleId, setCurrSaleId] = useState('');
    const [currSaleValue, setCurrSaleValue] = useState('');
    const [currSaleDate, setCurrSaleDate] = useState('');

    // For Deletion Modal usage on both clients and products deletion
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const openDeleteModal = () => setIsDeleteModalVisible(true);
    const closeDeleteModal = () => {
        setIsDeleteModalVisible(false);
        setCurrElementId('');
        setCurrElementName('');
        setCurrElementType('');
    }
    const [currElementName, setCurrElementName] = useState('');
    const [currElementId, setCurrElementId] = useState('');
    const [currType, setCurrElementType] = useState('');

    const [isNew, setIsNew] = useState(true);
    const [clientsData, setClientsData] = useState<any[]>([]);
    const [productsData, setProductsData] = useState<any[]>([]);
    const [salesData, setSalesData] = useState<any[]>([]);


    const loadClients = async () => {
        const loadedClientsData = await Database.getAllClients();
        setClientsData(loadedClientsData);
    }
    const loadProducts = async () => {
        const loadedProductsData = await Database.getAllProducts();
        setProductsData(loadedProductsData);
    }
    const loadSales = async () => {
        const loadedSalesData = await Database.getAllSales();
        setSalesData(loadedSalesData);
    }

	const loaders = {
		loadClients: loadClients,
		loadProducts: loadProducts,
		loadSales: loadSales
	};

    useEffect(() => {
        Database.initializeDatabase();
        loadClients();
        loadProducts();
		loadSales();
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.scrollViewProducts}>
                    {
                        clientsData.map((client) => (
                            <View key={client.clientId} style={styles.clientCard}>

                                <TouchableOpacity style={styles.cardBox} 
									onLongPress={() => {
										setCurrElementName(client.name);
										setCurrElementId(client.clientId);
										setCurrElementType('client');
										openDeleteModal();
									}}>
                                    <Text style={styles.cardTitle}>{client.name}</Text>
                                    <TouchableOpacity onPress={() => { 
                                        setCurrClientId(client.clientId)
                                        setCurrClientName(client.name)
                                        setIsNew(false)
                                        openClientModal();
                                    }}>
                                        <MaterialIcons name='edit' style={styles.cardTitle}/>
                                    </TouchableOpacity>
                                </TouchableOpacity>

                                {
                                    productsData.map((product) => (
                                        product.clientId === client.clientId ?
											// Product Name
											<View key={product.productId}>
												<TouchableOpacity style={styles.productBox}
													onLongPress={() => { 
														setCurrElementId(product.productId);
														setCurrElementName(product.name);
														setCurrElementType('product');
														openDeleteModal();
													}}
												>
													<View style={styles.productTitleBox}>
														<Text style={styles.productText}>{product.name}</Text>
														<TouchableOpacity 
															onPress={() => { 
																setCurrClientId(product.clientId)
																setCurrProductId(product.productId)
																setCurrProductName(product.name)
																setIsNew(false)
																openProductModal();
															}}
														>
															<MaterialIcons name='edit' style={styles.productText}/>
														</TouchableOpacity>
													</View>
												</TouchableOpacity>
												{
													salesData.map((sale) => (
														sale.clientId === client.clientId && sale.productId === product.productId ?
														<TouchableOpacity key={sale.saleId}
															style={styles.saleBox}
															onLongPress={() => { 
																setCurrElementId(sale.saleId);
																setCurrElementName(product.name);
																setCurrElementType('sale');
																openDeleteModal();
															}}
														>
															<View style={styles.saleBoxDesc}>
																<Text>Vendido: {sale.date}</Text>	
																<Text>${sale.value}</Text>	
															</View>
														</TouchableOpacity> : null
													))
												}
												<View style={styles.newSaleBtnBox}>
													<TouchableOpacity style={styles.newSaleBtn} onPress={() => {
														setCurrSaleId('');
														setCurrSaleValue('');
														setCurrSaleDate('');
														setCurrClientId(client.clientId);
														setCurrProductId(product.productId);
														setIsNew(true);
														openSaleModal();
													}} >
														<Text>Nova Venda</Text>
														<MaterialIcons name="add" size={30} color="#007AFF" />
													</TouchableOpacity>
												</View>
											</View> : null
                                    ))
                                }

                                <TouchableOpacity style={styles.newProductBtn} onPress={() => {
                                    setCurrProductId('');
                                    setCurrProductName('');
                                    setIsNew(true);
                                    setCurrClientId(client.clientId)
                                    openProductModal();
                                }} >
                                    <Text>Novo Produto</Text>
                                    <MaterialIcons name="add" size={30} color="#007AFF" />
                                </TouchableOpacity>
                            </View>
                        ))
                    }
                </View>
            </ScrollView>

            <NewClient visible={isClientModalVisible} 
                closeModal={closeClientModal}
                reloadClients={loaders.loadClients}
                id={currClientId}
                name={currClientName}
                isNew={isNew}
            />

            <NewProduct visible={isProductModalVisible} 
                closeModal={closeProductModal}
                reloadProducts={loaders.loadProducts}
				clientId={currClientId}
                id={currProductId}
                name={currProductName}
                isNew={isNew}
            />

            <NewSale visible={isSaleModalVisible} 
                closeModal={closeSaleModal}
				clientId={currClientId}
				productId={currProductId}
                id={currSaleId}
				date={currSaleDate}
				value={currSaleValue}
				reloadSales={loaders.loadSales}
                isNew={isNew}
            />
            
            <DeleteElement visible={isDeleteModalVisible}
				loaders={loaders}
                closeModal={closeDeleteModal}
                id={currElementId}
                name={currElementName}
                type={currType}
            />

            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.newClientBtn} onPress={() => {
                    setCurrClientId('');
                    setCurrClientName('');
                    setIsNew(true);
                    openClientModal();
                }}>
                    <MaterialIcons name="add" size={30} color="#007AFF" />
                    <Text>Cadastrar Novo Cliente</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    scrollView: {
        flexGrow: 1,
    },
    scrollViewProducts: {
        flexGrow: 1,
        alignItems: 'center'
    },
    bottomBar: {
        width: '100%',
        borderTopColor: '#000000',
        borderTopWidth: 2,
        paddingBottom: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    newClientBtn: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    clientCard: {
        flex: 1,
        flexDirection: 'column',
        width: '90%',
    },
    cardBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBlock: 5,
        paddingInline: 20,
        borderBottomWidth: 2,
        borderColor: "#cacaca",
    },
    cardTitle: {
        fontWeight: 'bold',
        fontSize: 24,
    },
    productBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBlock: 5,
        paddingInline: 20,
    },
    productText: {
        fontSize: 22,
		textDecorationLine: 'underline',
    },
    productTitleBox: {
        flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-between',
        gap: 15,
    },
	saleBox: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	saleBoxDesc: {
		width: '85%',
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
	},
    newProductBtn: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eaeaea',
        paddingVertical: 10,
        marginBottom: 20,
    },
    newSaleBtnBox: {
		width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
	},
    newSaleBtn: {
        flexDirection: 'row',
        width: '85%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eaeaea',
        paddingVertical: 10,
        marginBottom: 20,
    },
});

