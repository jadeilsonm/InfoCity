import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "./Themed";
import { useNavigation } from "expo-router";

export default function CardNameCity({
  nome,
  uf,
  id,
}: {
  nome: string;
  uf: string;
  id: number;
}) {
  const navigation = useNavigation();
  const onPressHandler = () => {
    // @ts-ignore
    navigation.navigate("details", { id: id, nome: nome });
  };
  return (
    <TouchableOpacity
      accessibilityRole='button'
      onPress={onPressHandler}
      style={[styles.button]}
      key={id}>
      <Text
        style={styles.button}>
        {nome} - {uf}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    marginTop: 5,
    width: "100%",
    backgroundColor: "#333333",
    borderRadius: 12,
  },
  buttonText: {
    textAlign: "center",
    color: "#ffffff",
    fontWeight: "bold",
  },
});
