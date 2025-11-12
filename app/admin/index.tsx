import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, useColorScheme } from "react-native";
import { useRouter } from "expo-router";

const ADMIN_USER = "dogvipadmin";
const ADMIN_PASS = "dgvp2025";

export default function AdminLogin() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const router = useRouter();

  const theme = useColorScheme();
  const isDark = theme === "dark";

  const login = () => {
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      router.replace("/admin/agendamentos");
    } else {
      alert("Usuário ou senha incorretos");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? "#111" : "#fff" }]}>
      <Text style={[styles.title, { color: isDark ? "#54BFC5" : "#54BFC5" }]}>Painel Administrativo</Text>

      <TextInput
        style={[
          styles.input,
          { backgroundColor: isDark ? "#222" : "#f2f2f2", color: isDark ? "#fff" : "#000" },
        ]}
        placeholder="Usuário"
        placeholderTextColor={isDark ? "#888" : "#666"}
        value={user}
        onChangeText={setUser}
      />
      <TextInput
        style={[
          styles.input,
          { backgroundColor: isDark ? "#222" : "#f2f2f2", color: isDark ? "#fff" : "#000" },
        ]}
        placeholder="Senha"
        placeholderTextColor={isDark ? "#888" : "#666"}
        secureTextEntry
        value={pass}
        onChangeText={setPass}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#54BFC5" }]}
        onPress={login}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 24, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  button: { padding: 14, borderRadius: 10, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
