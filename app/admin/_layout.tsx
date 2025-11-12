import React, { useEffect, useState } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AdminLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const segments = useSegments();
  const router = useRouter();

  // Verifica se o admin está logado
  useEffect(() => {
    const checkAuth = async () => {
      const logged = await AsyncStorage.getItem("adminLogged");
      setIsAuthenticated(!!logged);
    };
    checkAuth();
  }, []);

  // Monitora as mudanças de rota
  useEffect(() => {
    if (isAuthenticated === null) return;

    const inAdmin = segments[0] === "admin";

    if (inAdmin && !isAuthenticated) {
      router.replace("/admin"); // redireciona para login
    }
  }, [isAuthenticated, segments]);

  if (isAuthenticated === null) {
    return null; // evita piscar tela enquanto carrega o estado
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#54BFC5" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Login Administrativo" }} />
      <Stack.Screen name="agendamentos" options={{ title: "Lista de Agendamentos" }} />
    </Stack>
  );
}
