import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  useColorScheme,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function CadastroScreen() {
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const colors = {
    bg: isDark ? "#111" : "#fff",
    text: isDark ? "#f2f2f2" : "#222",
    inputBg: isDark ? "#222" : "#f5f5f5",
    inputBorder: isDark ? "#444" : "#ccc",
    placeholder: isDark ? "#888" : "#999",
  };

  useEffect(() => {
    const loadUser = async () => {
      const saved = await AsyncStorage.getItem("userData");
      if (saved) {
        setIsFirstTime(false);
      }
    };
    loadUser();
  }, []);

  const handleSubmit = async () => {
    if (isFirstTime) {
      if (!name || !phone || !password) {
        return Alert.alert("Preencha todos os campos!");
      }

      const user = { name, phone, password };
      await AsyncStorage.setItem("userData", JSON.stringify(user));

      router.replace("(tabs)");
      return;
    }

    const saved = await AsyncStorage.getItem("userData");
    if (!saved) return Alert.alert("Erro", "Nenhum cadastro encontrado.");

    const storedUser = JSON.parse(saved);

    if (name === storedUser.name && password === storedUser.password) {
      router.replace("(tabs)");
    } else {
      Alert.alert("Nome ou senha incorretos.");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 24,
        justifyContent: "center",
        backgroundColor: colors.bg,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 28,
          textAlign: "center",
          color: colors.text,
        }}
      >
        {isFirstTime ? "Criar Cadastro" : "Entrar"}
      </Text>

      <TextInput
        placeholder="Nome"
        placeholderTextColor={colors.placeholder}
        value={name}
        onChangeText={setName}
        style={{
          backgroundColor: colors.inputBg,
          borderWidth: 1,
          borderColor: colors.inputBorder,
          padding: 14,
          borderRadius: 10,
          color: colors.text,
          marginBottom: 14,
        }}
      />

      {isFirstTime && (
        <TextInput
          placeholder="Telefone"
          placeholderTextColor={colors.placeholder}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          style={{
            backgroundColor: colors.inputBg,
            borderWidth: 1,
            borderColor: colors.inputBorder,
            padding: 14,
            borderRadius: 10,
            color: colors.text,
            marginBottom: 14,
          }}
        />
      )}

      <TextInput
        placeholder="Senha"
        placeholderTextColor={colors.placeholder}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          backgroundColor: colors.inputBg,
          borderWidth: 1,
          borderColor: colors.inputBorder,
          padding: 14,
          borderRadius: 10,
          color: colors.text,
          marginBottom: 22,
        }}
      />

      <TouchableOpacity
        onPress={handleSubmit}
        style={{
          backgroundColor: "#54BFC5",
          padding: 16,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {isFirstTime ? "Cadastrar" : "Entrar"}
        </Text>
      </TouchableOpacity>

      {/* 🔥 Botão de recadastrar */}
      {!isFirstTime && (
        <TouchableOpacity
          onPress={async () => {
            await AsyncStorage.removeItem("userData");
            setIsFirstTime(true);
            setName("");
            setPhone("");
            setPassword("");
            Alert.alert("Cadastro apagado", "Faça um novo cadastro.");
          }}
          style={{ marginTop: 16 }}
        >
          <Text
            style={{
              color: "#54BFC5",
              fontSize: 16,
              fontWeight: "500",
              textAlign: "center",
              textDecorationLine: "underline",
            }}
          >
            Esqueci minha senha / Recadastrar
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
