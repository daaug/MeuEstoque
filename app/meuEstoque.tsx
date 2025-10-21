import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, StatusBar, Platform } from 'react-native';
import NewSection from './modal/newSection';
import Database from './database/initializeDatabase';
import NewItem from './modal/newItem';



export default function MeuEstoque() {

    const [isSectionModalVisible, setIsSectionModalVisible] = useState(false);
    const openSectionModal = () => setIsSectionModalVisible(true);
    const closeSectionModal = () => setIsSectionModalVisible(false);
    const [isItemModalVisible, setIsItemModalVisible] = useState(false);
    const openItemModal = () => setIsItemModalVisible(true);
    const closeItemModal = () => {
      setIsItemModalVisible(false);
      setCurrItemId('');
      setCurrItemName('');
      setCurrItemValue('');
      setCurrItemMeasure('');
    }

    const [currSectionId, setCurrSectionId] = useState('');
    const [currItemId, setCurrItemId] = useState('');
    const [currItemName, setCurrItemName] = useState('');
    const [currItemValue, setCurrItemValue] = useState('');
    const [currItemMeasure, setCurrItemMeasure] = useState('');
    const [isNew, setIsNew] = useState(true);

    const [sectionsData, setSectionsData] = useState<any[]>([]);
    const [itemsData, setItemsData] = useState<any[]>([]);

    const loadItems = async () => {
        const loadedItemsData = await Database.getAllItems();
        setItemsData(loadedItemsData);
    }

    const loadSections = async () => {
        const loadedSectionsData = await Database.getAllSections();
        setSectionsData(loadedSectionsData);
    }

    useEffect(() => {
          (async () => {
            await Database.initializeDatabase();
            await loadSections();
            await loadItems();
          })();

    }, []);

    return (
        <View style={styles.container}>

            <ScrollView style={styles.scrollView}>
                <View style={styles.scrollViewItems}>
                    {
                        sectionsData.map((section) => (
                            <View key={section.sectionId} style={styles.sectionCard}>

                                <View style={styles.cardBox}>
                                    <Text style={styles.cardTitle}>{section.name}</Text>
                                    <TouchableOpacity onPress={() => { console.log(section.name) }}>
                                        <MaterialIcons name='edit' style={styles.cardTitle}/>
                                    </TouchableOpacity>
                                </View>

                                {
                                    itemsData.map((item) => (
                                        item.sectionId === section.sectionId ?
                                            <TouchableOpacity key={item.itemId} style={styles.itemBox}
                                                onLongPress={() => { console.log("Item to be deleted: ", item.itemId) }}
                                            >
                                                <Text style={styles.itemText}>{item.name}</Text>
                                                <View style={styles.itemMeasureBox}>
                                                    <Text style={styles.itemText}>{item.value}{item.measure}</Text>
                                                    <TouchableOpacity 
                                                        onPress={() => { 
                                                            setCurrSectionId(item.sectionId)
                                                            setCurrItemId(item.itemId)
                                                            setCurrItemName(item.name)
                                                            setCurrItemValue(item.value.toString())
                                                            setCurrItemMeasure(item.measure)
                                                            setIsNew(false)
                                                            openItemModal();
                                                        }}
                                                    >
                                                        <MaterialIcons name='edit' style={styles.itemText}/>
                                                    </TouchableOpacity>
                                                </View>
                                            </TouchableOpacity> : null
                                    ))
                                }

                                <TouchableOpacity style={styles.newItemBtn} onPress={() => {
                                    setCurrItemId('');
                                    setCurrItemName('');
                                    setCurrItemValue('');
                                    setCurrItemMeasure('g');
                                    setIsNew(true);
                                    setCurrSectionId(section.sectionId)
                                    openItemModal();
                                }} >
                                    <Text>Novo Item</Text>
                                    <MaterialIcons name="add" size={30} color="#007AFF" />
                                </TouchableOpacity>
                            </View>
                        ))
                    }
                </View>
            </ScrollView>

            <NewSection visible={isSectionModalVisible} 
                closeModal={closeSectionModal}
                reloadSections={loadSections}
            />

            <NewItem visible={isItemModalVisible} 
                closeModal={closeItemModal}
                reloadItems={loadItems}
                reloadSections={loadSections}
                sectionId={currSectionId}
                id={currItemId}
                name={currItemName}
                value={currItemValue}
                measure={currItemMeasure}
                isNew={isNew}
            />

            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.newSectionBtn} onPress={openSectionModal}>
                    <MaterialIcons name="add" size={30} color="#007AFF" />
                    <Text>Cadastrar Nova Seção</Text>
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
    scrollViewItems: {
        flexGrow: 1,
        alignItems: 'center'
    },
    bottomBar: {
        width: '100%',
        borderTopColor: '#000000',
        borderTopWidth: 2,
        paddingBottom: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    newSectionBtn: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    sectionCard: {
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
    itemBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBlock: 5,
        paddingInline: 20,
    },
    itemText: {
        fontSize: 20,
    },
    itemMeasureBox: {
        flexDirection: 'row',
        gap: 15,
    },
    newItemBtn: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eaeaea',
        paddingVertical: 10,
        marginBottom: 20,
    },
});

