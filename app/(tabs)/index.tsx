import { KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import { useCallback, useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function TabOneScreen() {
  const navigation = useNavigation();
  const initialText = "";
  const [email, setEmail] = useState(initialText);
  const [password, setPassword] = useState(initialText);
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onChangeTextCallback = useCallback((newText: string) => {
    setEmail(newText);
  }, [setEmail]);

  const onChangePasswordCallback = useCallback((newText: string) => {
    setPassword(newText);
  }, [setPassword]);

  const onPressHandler = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email) || password.length < 6) {
      setError(true);
      return;
    } else {
      setEmail(initialText);
      setPassword(initialText);
      // @ts-ignore
      navigation.navigate("two");
    }
  };

  

  return (
    <KeyboardAvoidingView style={styles.container}  behavior={ Platform.OS === "ios" ?"padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} enabled>
      <Text style={styles.title}>InfoCity</Text>
      <View
        style={styles.separator}
        lightColor='#eee'
        darkColor='rgba(255,255,255,0.1)'
      />
      <Text style={styles.subtitle}>Login</Text>
      <View style={styles.containerInput}>
        <TextInput
          style={{ width: "100%" }}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={onChangeTextCallback}
          value={email}
          placeholder={"Digite seu Email"}
          />
      </View>
      <View style={styles.containerInput}>
        <TextInput
          style={{ width: "90%" }}
          secureTextEntry={!showPassword}
          onChangeText={onChangePasswordCallback}
          value={password}
          placeholder={"Digite sua Senha"}
        />
        <MaterialCommunityIcons
          name={showPassword ? "eye-off" : "eye"}
          size={24}
          color='#aaa'
          style={styles.icon}
          onPress={() => setShowPassword(!showPassword)}
        />
      </View>
      <TouchableOpacity
        accessibilityRole='button'
        style={[styles.button, email.length === 0 || password.length === 0 ? styles.buttonDisabled : styles.button]}
        onPress={onPressHandler}
       >
        <Text style={{ textAlign: "center", color: "#ffffff", fontSize: 18, fontWeight: "bold" }}>Login</Text>
      </TouchableOpacity>
      {error && <Text style={styles.subtitle}>Credenciais invalidas</Text>}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
  },
  containerInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    padding: 15,
    marginTop: 35,
    height: 55,
    width: "80%",
    backgroundColor: "#333333",
    borderRadius: 12,
    color: "#ffffff"
  },
  icon: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    color: "#333",
    paddingVertical: 10,
    paddingRight: 10,
    fontSize: 16,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#EE6D00",
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  button: {
    padding: 15,
    marginTop: 35,
    width: "80%",
    alignItems: "center",
    backgroundColor: "#EE6D00",
    borderRadius: 12,
  },
  buttonDisabled: {
    backgroundColor: "#333333",
    borderRadius: 12,
  },
  textInput: {
    padding: 15,
    marginTop: 35,
    width: "80%",
    backgroundColor: "#333333",
    borderRadius: 12,
    color: "#ffffff",
  },
});
