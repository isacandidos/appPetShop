import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useAppointments } from "../../context/AppointmentsContext";

export default function AppointmentsScreen() {
  const { appointments, removeAppointment } = useAppointments();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Agendamentos</Text>

      {appointments.length === 0 ? (
        <Text style={styles.empty}>Nenhum agendamento ainda 🐾</Text>
      ) : (
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.petName}>🐶 {item.petName}</Text>
              <Text style={styles.info}>Serviço: {item.service}</Text>
              {item.address ? <Text style={styles.info}>📍 {item.address}</Text> : null}

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
  container: { flex: 1, padding: 20, backgroundColor: "#f5f6fa" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#54BFC5",
    marginBottom: 20,
    textAlign: "center",
  },
  empty: {
    textAlign: "center",
    fontSize: 16,
    color: "#718093",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  petName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#2f3640",
  },
  info: {
    fontSize: 15,
    color: "#353b48",
    marginBottom: 4,
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: "#e84118",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
