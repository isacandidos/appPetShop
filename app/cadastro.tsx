import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function CadastroScreen() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  const router = useRouter();
  const theme = useColorScheme();
  const isDark = theme === "dark";

  const handleSave = async () => {
    if (!nome || !email || !telefone) {
      return Alert.alert("Atenção", "Preencha todos os campos antes de continuar.");
    }

    const userData = { nome, email, telefone };
    await AsyncStorage.setItem("userData", JSON.stringify(userData));

    router.replace("(tabs)");
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? "#111" : "#fff" }]}>
      <Text style={[styles.title, { color: "#54BFC5" }]}>Cadastro 🐾</Text>
      <Text style={[styles.subtitle, { color: isDark ? "#ddd" : "#333" }]}>
        Complete seu cadastro para continuar:
      </Text>

      <TextInput
        style={[styles.input, { backgroundColor: isDark ? "#222" : "#fff", color: isDark ? "#fff" : "#000" }]}
        placeholder="Seu nome"
        placeholderTextColor={isDark ? "#888" : "#666"}
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={[styles.input, { backgroundColor: isDark ? "#222" : "#fff", color: isDark ? "#fff" : "#000" }]}
        placeholder="Seu e-mail"
        placeholderTextColor={isDark ? "#888" : "#666"}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={[styles.input, { backgroundColor: isDark ? "#222" : "#fff", color: isDark ? "#fff" : "#000" }]}
        placeholder="Telefone"
        placeholderTextColor={isDark ? "#888" : "#666"}
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar e Continuar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 30, alignItems: "center" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 12 },
  subtitle: { fontSize: 16, marginBottom: 24, textAlign: "center" },
  input: { width: "100%", borderWidth: 1, borderColor: "#ccc", padding: 14, borderRadius: 10, marginBottom: 12 },
  button: { backgroundColor: "#54BFC5", paddingVertical: 14, paddingHorizontal: 24, borderRadius: 10 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
