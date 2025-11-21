import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  useColorScheme,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function AdminLogin() {
  const theme = useColorScheme();
  const isDark = theme === "dark";
  const router = useRouter();

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      const logged = await AsyncStorage.getItem("adminLogged");

      if (logged === "true") {
        router.replace("/admin/agendamentos");
      }
      setLoading(false);
    };

    checkAdmin();
  }, []);

  if (loading) return null;

  const handleLogin = async () => {
    if (user !== "dogvipadmin" || pass !== "dgvp2025") {
      Alert.alert("Erro", "Usuário ou senha incorretos");
      return;
    }

    await AsyncStorage.setItem("adminLogged", "true");
    router.replace("/admin/agendamentos");
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#111" : "#fff" },
      ]}
    >
      <Text style={[styles.title, { color: "#54BFC5" }]}>
        Área Administrativa
      </Text>

      <TextInput
        placeholder="Usuário"
        placeholderTextColor={isDark ? "#888" : "#666"}
        value={user}
        onChangeText={setUser}
        style={[
          styles.input,
          {
            backgroundColor: isDark ? "#222" : "#eee",
            color: isDark ? "#fff" : "#000",
          },
        ]}
      />

      <TextInput
        placeholder="Senha"
        placeholderTextColor={isDark ? "#888" : "#666"}
        secureTextEntry
        value={pass}
        onChangeText={setPass}
        style={[
          styles.input,
          {
            backgroundColor: isDark ? "#222" : "#eee",
            color: isDark ? "#fff" : "#000",
          },
        ]}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#54BFC5",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
