import { Stack } from "expo-router";
import { AppointmentsProvider } from "../context/AppointmentsContext";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await AsyncStorage.getItem("userData");
        setIsRegistered(!!user);
      } catch (err) {
        console.log("Erro ao verificar cadastro:", err);
        setIsRegistered(false);
      }
    };
    checkUser();
  }, []);

  if (isRegistered === null) return null; // carrega em branco por milissegundos

  return (
    <AppointmentsProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: colorScheme === "dark" ? "#111" : "#fff",
          },
        }}
      >
        {isRegistered ? (
          // Usuário já cadastrado → entra direto nas abas principais
          <Stack.Screen name="(tabs)" />
        ) : (
          // Novo usuário → abre tela de cadastro
          <Stack.Screen name="cadastro" />
        )}

        {/** Tela modal (se quiser usar depois) */}
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </AppointmentsProvider>
  );
}
