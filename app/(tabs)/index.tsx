import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useState } from 'react';
import { useNavigation } from 'expo-router';


export default function TabOneScreen() {
  const navigation = useNavigation();
  const initialText = '';
  const [email, setEmail] = useState(initialText);
  const [password, setPassword] = useState(initialText);
  
  const onPressHandler = () => {
    setEmail(initialText);
    setPassword(initialText);
    const routerName = "modal";
    // @ts-ignore
    navigation.navigate(routerName);
  }

  const isDisabled = email === '' || password === '';

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Bem Vindo! ao InfoCity</Text>
      <Text style={styles.subtitle}>Faça login para continuar</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.title}>Login</Text>
      <TextInput
          style={styles.textInput}
          onChangeText={setEmail}
          value={email}
          placeholder={'Digite seu Email'}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={setPassword}
          value={password}
          placeholder={'Digite sua Senha'}
        />

        <TouchableOpacity
          accessibilityRole="button"
          style={[
            styles.button,
            isDisabled ? styles.buttonDisabled : null
          ]}
          onPress={onPressHandler}
          disabled={isDisabled}>

          <Text style={{textAlign: 'center', color: '#000'}}>Login</Text>
        </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  button: {
    padding: 15,
    marginTop: 35,
    width: '80%',
    backgroundColor: '#ffffff',
  },
  buttonDisabled: {
    backgroundColor: '#5c1818',
  },
  textInput: {
    padding: 15,
    marginTop: 35,
    width: '80%',
    backgroundColor: '#3e3c3c',
  }
});
