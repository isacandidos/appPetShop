import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  useColorScheme,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export default function MeusAgendamentosScreen() {
  const theme = useColorScheme();
  const isDark = theme === "dark";

  const [appointments, setAppointments] = useState([]);
  const [clientPhone, setClientPhone] = useState("");

  // Carrega o usuário e os agendamentos ao abrir a tela
  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        const user = await AsyncStorage.getItem("userData");
        if (!user) return;

        const parsed = JSON.parse(user);
        setClientPhone(parsed.phone);

        const storageKey = `@appointments_${parsed.phone}`;
        const saved = await AsyncStorage.getItem(storageKey);

        setAppointments(saved ? JSON.parse(saved) : []);
      };

      load();
    }, [])
  );

  const removeAppointment = async (id) => {
    Alert.alert("Confirmar", "Deseja cancelar este agendamento?", [
      { text: "Não" },
      {
        text: "Sim",
        onPress: async () => {
          const filtered = appointments.filter((item) => item.id !== id);

          const storageKey = `@appointments_${clientPhone}`;
          await AsyncStorage.setItem(storageKey, JSON.stringify(filtered));

          setAppointments(filtered);
        },
      },
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? "#111" : "#fff" }]}>
      <Text style={[styles.title, { color: "#54BFC5" }]}>Meus Agendamentos</Text>

      {appointments.length === 0 ? (
        <Text style={[styles.empty, { color: isDark ? "#ccc" : "#555" }]}>
          Nenhum agendamento ainda 🐾
        </Text>
      ) : (
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View
              style={[
                styles.card,
                {
                  backgroundColor: isDark ? "#222" : "#fff",
                  borderColor: isDark ? "#333" : "#ddd",
                },
              ]}
            >
              <Text style={[styles.petName, { color: isDark ? "#fff" : "#000" }]}>
                🐶 {item.petName}
              </Text>

              <Text style={[styles.info, { color: isDark ? "#ccc" : "#333" }]}>
                Serviço: {item.service}
              </Text>

              <Text style={[styles.info, { color: isDark ? "#ccc" : "#333" }]}>
                Transporte: {item.transport}
              </Text>

              {item.address ? (
                <Text style={[styles.info, { color: isDark ? "#ccc" : "#333" }]}>
                  Endereço: {item.address}
                </Text>
              ) : null}

              <Text style={[styles.info, { color: isDark ? "#ccc" : "#333" }]}>
                Data: {new Date(item.when).toLocaleDateString("pt-BR")}
              </Text>

              <Text style={[styles.info, { color: isDark ? "#ccc" : "#333" }]}>
                Hora:{" "}
                {new Date(item.when).toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => removeAppointment(item.id)}
              >
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16, textAlign: "center", marginTop: "30"},
  empty: { textAlign: "center"},
  card: {
    borderWidth: 1,
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  petName: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
  info: { fontSize: 15, marginBottom: 4 },
  cancelButton: {
    backgroundColor: "#e84118",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  cancelText: { color: "#fff", fontWeight: "bold" },
});
