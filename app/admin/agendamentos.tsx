// app/admin/agendamentos.tsx
import React, { useEffect, useState } from "react";
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

// 👉 Tipo dos agendamentos
type Appointment = {
  id: string;
  petName: string;
  service: string;
  transport: string;
  address?: string;
  when: string; // ISO
  clientPhone?: string;
};

export default function AdminAgendamentos() {
  const theme = useColorScheme();
  const isDark = theme === "dark";

  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // ================================
  // 📌 Carregar todos os agendamentos do app
  // ================================
  const loadAllAppointments = async () => {
    try {
      setLoading(true);

      const keys = await AsyncStorage.getAllKeys();
      const appointmentKeys = keys.filter((k) =>
        k.startsWith("@appointments_")
      );

      const all: Appointment[] = [];

      for (const k of appointmentKeys) {
        const saved = await AsyncStorage.getItem(k);
        if (saved) {
          const parsed: Appointment[] = JSON.parse(saved);
          parsed.forEach((item) => all.push(item));
        }
      }

      setAppointments(all);
    } catch (err) {
      console.log("Erro ao carregar agendamentos:", err);
    } finally {
      setLoading(false);
    }
  };

  // ================================
  // 📌 Remover agendamento
  // ================================
  const removeAppointment = async (id: string) => {
    Alert.alert("Confirmar", "Deseja excluir este agendamento?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            const keys = await AsyncStorage.getAllKeys();
            const appointmentKeys = keys.filter((k) =>
              k.startsWith("@appointments_")
            );

            for (const k of appointmentKeys) {
              const saved = await AsyncStorage.getItem(k);
              if (!saved) continue;

              const parsed: Appointment[] = JSON.parse(saved);
              const filtered = parsed.filter((item) => item.id !== id);

              await AsyncStorage.setItem(k, JSON.stringify(filtered));
            }

            setAppointments((prev) =>
              prev.filter((item) => item.id !== id)
            );
          } catch (error) {
            console.log("Erro ao excluir:", error);
          }
        },
      },
    ]);
  };

  useEffect(() => {
    loadAllAppointments();
  }, []);

  const renderItem = ({ item }: { item: Appointment }) => (
    <TouchableOpacity
      onLongPress={() => removeAppointment(item.id)}
      style={[
        styles.card,
        { backgroundColor: isDark ? "#222" : "#f9f9f9", borderColor: "#ccc" },
      ]}
    >
      <Text style={styles.label}>🐶 Pet: <Text style={styles.info}>{item.petName}</Text></Text>
      <Text style={styles.label}>✂️ Serviço: <Text style={styles.info}>{item.service}</Text></Text>
      <Text style={styles.label}>🚕 Transporte: <Text style={styles.info}>{item.transport}</Text></Text>

      {item.address ? (
        <Text style={styles.label}>📍 Endereço: <Text style={styles.info}>{item.address}</Text></Text>
      ) : null}

      <Text style={styles.label}>📅 Data: <Text style={styles.info}>
        {new Date(item.when).toLocaleDateString("pt-BR")}
      </Text></Text>

      <Text style={styles.label}>⏰ Hora: <Text style={styles.info}>
        {new Date(item.when).toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Text></Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDark ? "#111" : "#fff" }]}>
      <Text style={[styles.title, { color: "#54BFC5" }]}>Lista de Agendamentos</Text>

      {loading ? (
        <Text style={{ color: isDark ? "#ccc" : "#555", marginTop: 20 }}>
          Carregando...
        </Text>
      ) : appointments.length === 0 ? (
        <Text style={{ color: isDark ? "#ccc" : "#555", marginTop: 20 }}>
          Nenhum agendamento encontrado.
        </Text>
      ) : (
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          style={{ width: "100%" }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16, marginTop: "30" },
  card: {
    width: "100%",
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 12,
  },
  label: { fontSize: 15, fontWeight: "bold", color: "#333" },
  info: { fontWeight: "normal", color: "#555" },
});
