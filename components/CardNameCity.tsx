import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from './Themed';
import { useNavigation } from 'expo-router';

export default function CardNameCity({ nome, uf, key, id }: { nome: string, uf: string, key: number, id: number}) {
  const navigation = useNavigation();
  const onPressHandler = () => {
    console.log("id of in card", id);
    // @ts-ignore
    navigation.navigate('details', { id: id, nome: nome });
  }
  return (
    <View>
      <TouchableOpacity
          accessibilityRole="button"
          onPress={onPressHandler}
          style={[
            styles.button           
          ]}
          key={key}>
        <Text style={{textAlign: 'center', color: '#000'}}>{nome} - {uf}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    marginTop: 35,
    width: '80%',
    backgroundColor: '#ffffff',
  }
});
