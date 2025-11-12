import { Stack } from "expo-router";
import { AppointmentsProvider } from "../context/AppointmentsContext";
import { useColorScheme } from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();

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
        {/** Tela de cadastro abre primeiro antes das abas */}
        <Stack.Screen name="cadastro" />

        {/** Grupo principal do app */}
        <Stack.Screen name="(tabs)" />

        {/** Tela modal (depois se quiser usar) */}
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </AppointmentsProvider>
  );
}
