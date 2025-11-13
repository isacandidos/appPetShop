// app/cadastro.tsx
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, useColorScheme, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Cadastro() {
  const router = useRouter();
  const theme = useColorScheme();
  const isDark = theme === "dark";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!name || !phone || !password) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    const userData = { name, phone, password };
    await AsyncStorage.setItem("userData", JSON.stringify(userData));

    router.replace("/(tabs)");
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? "#111" : "#fff" }]}>
      <Text style={[styles.title, { color: "#54BFC5" }]}>Cadastro do Cliente</Text>

      <TextInput
        placeholder="Nome completo"
        placeholderTextColor={isDark ? "#888" : "#666"}
        value={name}
        onChangeText={setName}
        style={[styles.input, { backgroundColor: isDark ? "#222" : "#f2f2f2", color: isDark ? "#fff" : "#000" }]}
      />

      <TextInput
        placeholder="Telefone"
        placeholderTextColor={isDark ? "#888" : "#666"}
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
        style={[styles.input, { backgroundColor: isDark ? "#222" : "#f2f2f2", color: isDark ? "#fff" : "#000" }]}
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        placeholderTextColor={isDark ? "#888" : "#666"}
        value={password}
        onChangeText={setPassword}
        style={[styles.input, { backgroundColor: isDark ? "#222" : "#f2f2f2", color: isDark ? "#fff" : "#000" }]}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar e Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 24, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 10, padding: 12, marginBottom: 12 },
  button: { backgroundColor: "#54BFC5", padding: 14, borderRadius: 10, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
