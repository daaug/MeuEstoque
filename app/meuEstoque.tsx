import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, StatusBar, Platform } from 'react-native';
import NewSection from './modal/newSection';

let myObject = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
};

export default function MeuEstoque() {
  const [isSectionModalVisible, setIsSectionModalVisible] = useState(false);
  const openSectionModal = () => setIsSectionModalVisible(true);
  function closeSectionModal () { setIsSectionModalVisible(false) };

  return (
    <View style={styles.container}>
    
      <ScrollView style={styles.itemsList}>
        {Object.keys(myObject).map((key) => (
          <Text key={key}>
            {key}: {myObject[key as keyof typeof myObject]}
          </Text>
        ))}
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
  itemsList: {
    flexGrow: 1,
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
});

