import { TextInput, TextInputProps, StyleSheet } from "react-native";

export default function Input({...rest}: TextInputProps) {
  return <TextInput 
    {...rest}
    style={styles.input}
  />;
}

const styles = StyleSheet.create({
  input: {
    borderColor: '#000000',
    borderWidth: 1,
    fontSize: 22,
  }
});
