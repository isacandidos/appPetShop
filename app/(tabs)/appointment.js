import React, { useEffect, useState, useCallback } from "react";
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
import { useFocusEffect } from "expo-router";

const STORAGE_KEY = "@dogvip_appointments";

export default function AppointmentScreen() {
  const [appointments, setAppointments] = useState([]);
  const theme = useColorScheme();
  const isDark = theme === "dark";

  // 🔁 Carrega sempre que a tela ganha foco (para atualizar instantâneo)
  useFocusEffect(
    useCallback(() => {
      const loadAppointments = async () => {
        try {
          const stored = await AsyncStorage.getItem(STORAGE_KEY);
          const list = stored ? JSON.parse(stored) : [];
          setAppointments(list);
        } catch (err) {
          console.log("Erro ao carregar agendamentos:", err);
        }
      };
      loadAppointments();
    }, [])
  );

  // 🗑️ Cancelar agendamento (somente aqui!)
  const cancelAppointment = (id) => {
    Alert.alert("Cancelar", "Deseja cancelar este agendamento?", [
      { text: "Não", style: "cancel" },
      {
        text: "Sim",
        style: "destructive",
        onPress: async () => {
          try {
            const updated = appointments.filter((x) => x.id !== id);
            setAppointments(updated);
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
          } catch (err) {
            console.log("Erro ao cancelar:", err);
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }) => {
    const date = item.datetime
      ? new Date(item.datetime).toLocaleDateString("pt-BR")
      : "";
    const time = item.datetime
      ? new Date(item.datetime).toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";

    return (
      <View
        style={[
          styles.card,
          { backgroundColor: isDark ? "#222" : "#fff", borderColor: isDark ? "#333" : "#ddd" },
        ]}
      >
        <Text style={[styles.pet, { color: isDark ? "#fff" : "#000" }]}>
          🐾 {item.petName}
        </Text>
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
          Data: {date} às {time}
        </Text>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => cancelAppointment(item.id)}
        >
          <Text style={styles.cancelText}>Cancelar Agendamento</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View
      style={[styles.container, { backgroundColor: isDark ? "#111" : "#fff" }]}
    >
      <Text style={[styles.title, { color: "#54BFC5" }]}>
        Meus Agendamentos
      </Text>

      {appointments.length === 0 ? (
        <Text style={[styles.empty, { color: isDark ? "#bbb" : "#666" }]}>
          Nenhum agendamento ainda 🐶
        </Text>
      ) : (
        <FlatList
          data={appointments}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 60 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16, textAlign: "center" },
  empty: { textAlign: "center", fontSize: 16 },
  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
  },
  pet: { fontSize: 18, fontWeight: "bold", marginBottom: 6 },
  text: { fontSize: 15, marginBottom: 4 },
  cancelButton: {
    backgroundColor: "#e84118",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  cancelText: { color: "#fff", fontWeight: "bold" },
});
