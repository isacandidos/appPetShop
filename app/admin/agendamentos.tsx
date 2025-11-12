import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Appointment = {
  id: string;
  petName: string;
  service: string;
  transport: string;
  address?: string;
  datetime?: string;
};

const STORAGE_KEY = "@dogvip_appointments";

export default function AdminAgendamentos() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const theme = useColorScheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const load = async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        const arr: Appointment[] = json ? JSON.parse(json) : [];
        setAppointments(arr);
      } catch (err) {
        console.log("Erro ao ler agendamentos:", err);
      }
    };
    load();
  }, []);

  const removeById = async (id: string) => {
    const updated = appointments.filter((a) => a.id !== id);
    setAppointments(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? "#111" : "#fff" }]}>
      <Text style={[styles.title, { color: "#54BFC5" }]}>Lista de Agendamentos</Text>

      {appointments.length === 0 ? (
        <Text style={[styles.empty, { color: isDark ? "#bbb" : "#666" }]}>Nenhum agendamento ainda</Text>
      ) : (
        appointments.map((item) => (
          <View
            key={item.id}
            style={[
              styles.card,
              {
                backgroundColor: isDark ? "#222" : "#fff",
                borderColor: isDark ? "#333" : "#ddd",
              },
            ]}
          >
            <Text style={[styles.pet, { color: isDark ? "#fff" : "#000" }]}>🐶 {item.petName}</Text>
            <Text style={[styles.text, { color: isDark ? "#ccc" : "#333" }]}>
              Serviço: {item.service}
            </Text>
            <Text style={[styles.text, { color: isDark ? "#ccc" : "#333" }]}>
              Transporte: {item.transport}
            </Text>
            {item.address ? (
              <Text style={[styles.text, { color: isDark ? "#ccc" : "#333" }]}>
                Endereço: {item.address}
              </Text>
            ) : null}
            <Text style={[styles.text, { color: isDark ? "#ccc" : "#333" }]}>
              {item.datetime
                ? new Date(item.datetime).toLocaleString("pt-BR")
                : "Sem data"}
            </Text>

            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => removeById(item.id)}
            >
              <Text style={styles.deleteText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  empty: { textAlign: "center", fontSize: 16 },
  card: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
  },
  pet: { fontSize: 18, fontWeight: "bold" },
  text: { fontSize: 15, marginBottom: 4 },
  deleteBtn: {
    backgroundColor: "#e84118",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  deleteText: { color: "#fff", fontWeight: "bold" },
});
