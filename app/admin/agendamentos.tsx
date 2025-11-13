import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  useColorScheme,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

/**
 * Tipo de agendamento — ajuste se no app / context houver mais campos
 */
type Appointment = {
  id: string;
  petName: string;
  service: string;
  transport: string;
  address?: string;
  // guardamos a data/hora em ISO string para persistir facilmente
  datetime: string;
};

const STORAGE_KEY = "@dogvip:appointments"; // chave usada no AsyncStorage

export default function AdminAgendamentos() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Carrega agendamentos do AsyncStorage
  const loadAppointments = async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (!raw) {
        setAppointments([]);
        setLoading(false);
        return;
      }
      const parsed = JSON.parse(raw) as unknown;
      // segurança: somente arrays válidos virarão appointments
      if (Array.isArray(parsed)) {
        // map e validação mínima
        const list: Appointment[] = parsed
          .map((x) => {
            // tenta normalizar — aceitar objetos com os campos mínimos
            if (!x || typeof x !== "object") return null;
            const maybe = x as Partial<Appointment>;
            if (!maybe.id || !maybe.petName || !maybe.service || !maybe.datetime)
              return null;
            return {
              id: String(maybe.id),
              petName: String(maybe.petName),
              service: String(maybe.service),
              transport: String(maybe.transport ?? "Nenhum"),
              address: maybe.address ? String(maybe.address) : undefined,
              datetime: String(maybe.datetime),
            } as Appointment;
          })
          .filter(Boolean) as Appointment[];

        setAppointments(list);
      } else {
        setAppointments([]);
      }
    } catch (err) {
      console.log("Erro ao carregar agendamentos (admin):", err);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  // Remove um agendamento (por id)
  const removeAppointment = async (id: string) => {
    Alert.alert("Confirmar", "Deseja excluir este agendamento?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            const updated = appointments.filter((a) => a.id !== id);
            setAppointments(updated);
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
          } catch (err) {
            console.log("Erro ao excluir agendamento:", err);
            Alert.alert("Erro", "Não foi possível excluir. Tente novamente.");
          }
        },
      },
    ]);
  };

  // Rendeiza data/hora a partir do ISO salvo
  const formatDatetime = (iso?: string) => {
    if (!iso) return "-";
    try {
      const d = new Date(iso);
      const date = d.toLocaleDateString("pt-BR");
      const time = d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
      return `${date} • ${time}`;
    } catch {
      return iso;
    }
  };

  const renderItem = ({ item }: { item: Appointment }) => (
    <View style={[styles.card, { backgroundColor: isDark ? "#1c1c1c" : "#fff", borderColor: isDark ? "#333" : "#eee" }]}>
      <View style={styles.rowTop}>
        <Text style={[styles.petName, { color: isDark ? "#fff" : "#222" }]}>{item.petName}</Text>

        <TouchableOpacity onPress={() => removeAppointment(item.id)} style={styles.deleteBtn}>
          <Text style={{ color: "#fff", fontWeight: "700" }}>Excluir</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.info, { color: isDark ? "#ddd" : "#444" }]}>Serviço: {item.service}</Text>
      <Text style={[styles.info, { color: isDark ? "#ddd" : "#444" }]}>Transporte: {item.transport}</Text>
      {item.address ? (
        <Text style={[styles.info, { color: isDark ? "#ddd" : "#444" }]}>Endereço: {item.address}</Text>
      ) : null}
      <Text style={[styles.info, { color: isDark ? "#ddd" : "#444" }]}>Quando: {formatDatetime(item.datetime)}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDark ? "#111" : "#f7f7f7" }]}>
      <Text style={[styles.title, { color: "#54BFC5" }]}>📋 Lista de Agendamentos</Text>

      {loading ? (
        <Text style={{ color: isDark ? "#bbb" : "#666", textAlign: "center", marginTop: 18 }}>Carregando...</Text>
      ) : appointments.length === 0 ? (
        <Text style={[styles.empty, { color: isDark ? "#bbb" : "#666" }]}>Nenhum agendamento.</Text>
      ) : (
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 12, textAlign: "center" },
  empty: { textAlign: "center", marginTop: 20 },
  card: {
    borderRadius: 10,
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  petName: { fontSize: 18, fontWeight: "700", marginBottom: 6 },
  info: { fontSize: 14, marginBottom: 6 },
  rowTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  deleteBtn: { backgroundColor: "#e84118", paddingVertical: 6, paddingHorizontal: 10, borderRadius: 8 },
});
