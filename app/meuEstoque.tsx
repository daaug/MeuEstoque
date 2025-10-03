import { MaterialIcons } from '@expo/vector-icons';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

let myObject = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
};

export default function MeuEstoque() {
  return (
    <View style={styles.container}>
    
      <ScrollView style={styles.itemsList}>
      {Object.keys(myObject).map((key) => (
        <Text key={key}>
          {key}: {myObject[key as keyof typeof myObject]}
        </Text>
      ))}

      </ScrollView>

      <View>
        <TouchableOpacity style={styles.newSectionBtn}>
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
  newSectionBtn: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: '#000000',
    borderTopWidth: 2,
    backgroundColor: '#ffffff',
  },
});

