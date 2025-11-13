import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AppointmentScreen() {
  const theme = useColorScheme();
  const isDark = theme === "dark";

  const [appointments, setAppointments] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      const user = await AsyncStorage.getItem("userData");
      if (user) {
        const { email } = JSON.parse(user);
        setUserEmail(email);
        loadAppointments(email);
      }
    };
    loadUser();
  }, []);

  const loadAppointments = async (email) => {
    const storageKey = `@appointments_${email}`;
    const data = await AsyncStorage.getItem(storageKey);
    if (data) setAppointments(JSON.parse(data));
  };

  const removeAppointment = async (id) => {
    const filtered = appointments.filter((item) => item.id !== id);
    setAppointments(filtered);

    const storageKey = `@appointments_${userEmail}`;
    await AsyncStorage.setItem(storageKey, JSON.stringify(filtered));

    Alert.alert("Agendamento cancelado!");
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? "#111" : "#fff" }]}>
      <Text style={[styles.title, { color: "#54BFC5" }]}>Meus Agendamentos</Text>

      {appointments.length === 0 ? (
        <Text style={[styles.empty, { color: isDark ? "#ccc" : "#666" }]}>Nenhum agendamento ainda 🐾</Text>
      ) : (
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View style={[styles.card, { backgroundColor: isDark ? "#222" : "#fff", borderColor: isDark ? "#444" : "#ddd" }]}>
              <Text style={[styles.petName, { color: isDark ? "#fff" : "#000" }]}>🐶 {item.petName}</Text>
              <Text style={[styles.info, { color: isDark ? "#ddd" : "#333" }]}>Serviço: {item.service}</Text>
              <Text style={[styles.info, { color: isDark ? "#ddd" : "#333" }]}>
                Data: {new Date(item.when).toLocaleDateString()}
              </Text>
              <Text style={[styles.info, { color: isDark ? "#ddd" : "#333" }]}>
                Hora: {new Date(item.when).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </Text>

              {item.transport !== "Nenhum" && (
                <Text style={[styles.info, { color: isDark ? "#ddd" : "#333" }]}>
                  Transporte: {item.transport}
                </Text>
              )}

              {item.address ? (
                <Text style={[styles.info, { color: isDark ? "#ddd" : "#333" }]}>📍 {item.address}</Text>
              ) : null}

              <TouchableOpacity style={styles.cancelButton} onPress={() => removeAppointment(item.id)}>
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
  container: { flex: 1, padding: 18 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 14, textAlign: "center" },
  empty: { textAlign: "center", fontSize: 16 },
  card: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  petName: { fontSize: 18, fontWeight: "bold" },
  info: { fontSize: 15, marginBottom: 4 },
  cancelButton: { marginTop: 8, backgroundColor: "#e84118", padding: 10, borderRadius: 8, alignItems: "center" },
  cancelText: { color: "#fff", fontWeight: "bold" },
});
