import { Stack } from "expo-router";
import { AppointmentsProvider } from "../context/AppointmentsContext";
import { useColorScheme } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loading, setLoading] = useState(true);
  const [hasUser, setHasUser] = useState(false);

  // Verifica se existe cadastro salvo no AsyncStorage
  useEffect(() => {
    const checkUser = async () => {
      try {
        const saved = await AsyncStorage.getItem("userData"); // userData = {name, phone, password}
        setHasUser(!!saved);
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
      }
      setLoading(false);
    };

    checkUser();
  }, []);

  if (loading) return null; // Evita piscar tela ao iniciar

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
        {/* Sempre registra a tela de cadastro */}
        <Stack.Screen name="cadastro" />

        {/* Se já existe cadastro → libera as demais rotas */}
        {hasUser && (
          <>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="admin" />
            <Stack.Screen name="modal" options={{ presentation: "modal" }} />
          </>
        )}
      </Stack>
    </AppointmentsProvider>
  );
}
