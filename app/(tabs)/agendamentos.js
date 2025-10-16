import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useAppointments } from "../../context/AppointmentsContext";

export default function AgendamentosScreen() {
  const { addAppointment } = useAppointments();
  const [petName, setPetName] = useState("");
  const [service, setService] = useState("");
  const [address, setAddress] = useState("");

  const handleSave = () => {
    if (!petName || !service) return;

    const newAppointment = {
      id: Date.now().toString(),
      petName,
      service,
      address,
    };

    addAppointment(newAppointment);

    setPetName("");
    setService("");
    setAddress("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Agendamento</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do Pet"
        value={petName}
        onChangeText={setPetName}
      />

      <TextInput
        style={styles.input}
        placeholder="Serviço (Banho ou Tosa)"
        value={service}
        onChangeText={setService}
      />

      <TextInput
        style={styles.input}
        placeholder="Endereço (opcional, se transporte)"
        value={address}
        onChangeText={setAddress}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar Agendamento</Text>
      </TouchableOpacity>
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
  input: {
    borderWidth: 1,
    borderColor: "#dcdde1",
    padding: 12,
    marginBottom: 12,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#54BFC5",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

