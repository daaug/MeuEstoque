import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, StatusBar, Platform } from 'react-native';
import NewSection from './modal/newSection';
import Database from './database/initializeDatabase';



export default function MeuEstoque() {
    Database.initializeDatabase();

    const [isSectionModalVisible, setIsSectionModalVisible] = useState(false);
    const openSectionModal = () => setIsSectionModalVisible(true);
    const closeSectionModal = () => setIsSectionModalVisible(false);
    const [sectionsData, setSectionsData] = useState<any[]>([]);

    useEffect(() => {
        const loadSections = async () => {
            const data = await Database.getAllSections();
            setSectionsData(data);
        }
        loadSections();

        const loadItems = async () => {
            const data = await Database.getAllItems();
            setSectionsData(data);
        }
        loadItems();

    }, []);

    return (
        <View style={styles.container}>

            <ScrollView style={styles.scrollView}>
                <View style={styles.scrollViewItems}>
                    {
                        sectionsData.map((section) => (
                            <View key={section.sectionId} style={styles.sectionCard}>
                                <Text style={styles.cardTitle}>{section.name}</Text>
                                <TouchableOpacity onPress={
                                    () => {
                                        console.log(section.name)
                                    }
                                }>
                                    <MaterialIcons name='edit' style={styles.cardTitle}/>
                                </TouchableOpacity>
                            </View>
                        ))
                    }

                </View>
            </ScrollView>

            <NewSection visible={isSectionModalVisible} closeModal={closeSectionModal} />

            <View style={styles.bottomBar}>
                <TouchableOpacity 
                style={styles.newSectionBtn}
                onPress={openSectionModal}
                >
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
        //backgroundColor: 'red',
        borderBottomWidth: 2,
        borderColor: "#cacaca",
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBlock: 5,
        paddingInline: 20,
        width: '90%',
    },
    cardTitle: {
        fontWeight: 'bold',
        fontSize: 22,
    }
});

