import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  useColorScheme,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useAppointments } from "../../context/AppointmentsContext"; // se existir

export default function AgendamentosScreen() {
  const { addAppointment } = useAppointments ? useAppointments() : { addAppointment: null };
  const params = useLocalSearchParams();
  const router = useRouter();

  const theme = useColorScheme();
  const isDark = theme === "dark";

  const [petName, setPetName] = useState("");
  const [service, setService] = useState("");
  const [transport, setTransport] = useState("Nenhum");
  const [address, setAddress] = useState("");
  const [when, setWhen] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

  useEffect(() => {
    if (params?.selectedService) setService(String(params.selectedService));
  }, [params]);

  // helper: read/write AsyncStorage key
  const STORAGE_KEY = "@dogvip_appointments";

  const persistAppointments = async (arr) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    } catch (err) {
      console.log("Erro salvando storage:", err);
    }
  };

  const getAppointmentsFromStorage = async () => {
    try {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      if (!json) return [];
      return JSON.parse(json);
    } catch (err) {
      console.log("Erro lendo storage:", err);
      return [];
    }
  };

  const handleSave = async () => {
    if (!petName || !service) {
      Alert.alert("Atenção", "Preencha o nome do pet e o serviço.");
      return;
    }

    const newAppointment = {
      id: Date.now().toString(),
      petName,
      service,
      transport,
      address,
      datetime: new Date(when).toISOString(),
    };

    try {
      // 1) atualiza AsyncStorage
      const existing = await getAppointmentsFromStorage();
      existing.push(newAppointment);
      await persistAppointments(existing);

      // 2) chama o contexto (se existir)
      if (addAppointment) {
        try { addAppointment(newAppointment); } catch (e) { /* ignore */ }
      }

      // 3) limpar campos
      setPetName("");
      setService("");
      setTransport("Nenhum");
      setAddress("");
      setWhen(new Date());

      Alert.alert("Sucesso", "Agendamento salvo!");

      // OBS: Você pediu sem envio de e-mail — também removi o envio automático de WhatsApp.
      // Se futuramente quiser notificar por WhatsApp, posso deixar uma opção para abrir link manual.
    } catch (err) {
      console.log("Erro ao salvar agendamento:", err);
      Alert.alert("Erro", "Não foi possível salvar o agendamento.");
    }
  };

  const onChangeDate = (_, selected) => {
    setShowDate(false);
    if (selected) {
      const merged = new Date(when);
      merged.setFullYear(selected.getFullYear(), selected.getMonth(), selected.getDate());
      setWhen(merged);
    }
  };

  const onChangeTime = (_, selected) => {
    setShowTime(false);
    if (selected) {
      const merged = new Date(when);
      merged.setHours(selected.getHours(), selected.getMinutes(), 0, 0);
      setWhen(merged);
    }
  };

  const dateLabel = when.toLocaleDateString();
  const timeLabel = when.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <View style={[styles.container, { backgroundColor: isDark ? "#111" : "#fff" }]}>
      <Text style={[styles.title, { color: "#54BFC5" }]}>Novo Agendamento</Text>

      <TextInput
        style={[styles.input, { backgroundColor: isDark ? "#222" : "#fff", color: isDark ? "#fff" : "#000" }]}
        placeholder="Nome do Pet"
        placeholderTextColor={isDark ? "#888" : "#666"}
        value={petName}
        onChangeText={setPetName}
      />

      <TextInput
        style={[styles.input, { backgroundColor: isDark ? "#222" : "#fff", color: isDark ? "#fff" : "#000" }]}
        placeholder="Serviço (Banho/Tosa)"
        placeholderTextColor={isDark ? "#888" : "#666"}
        value={service}
        onChangeText={setService}
      />

      <Text style={[styles.label, { color: isDark ? "#ccc" : "#444" }]}>Transporte:</Text>
      <View style={styles.transportRow}>
        {["Levar Após Banho", "Buscar para Banho", "Buscar e Levar", "Nenhum"].map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.transportButton,
              { backgroundColor: transport === option ? "#54BFC5" : (isDark ? "#222" : "#eee") },
            ]}
            onPress={() => setTransport(option)}
          >
            <Text style={{ color: transport === option ? "#fff" : (isDark ? "#ddd" : "#333") }}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {transport !== "Nenhum" && (
        <TextInput
          style={[styles.input, { backgroundColor: isDark ? "#222" : "#fff", color: isDark ? "#fff" : "#000" }]}
          placeholder="Endereço para transporte"
          placeholderTextColor={isDark ? "#888" : "#666"}
          value={address}
          onChangeText={setAddress}
        />
      )}

      <Text style={[styles.label, { color: isDark ? "#ccc" : "#444", marginTop: 6 }]}>Data e Hora:</Text>
      <View style={styles.row}>
        <TouchableOpacity style={styles.pickerBtn} onPress={() => { setShowDate(true); setShowTime(false); }}>
          <Text style={styles.pickerText}>📅 {dateLabel}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.pickerBtn} onPress={() => { setShowTime(true); setShowDate(false); }}>
          <Text style={styles.pickerText}>⏰ {timeLabel}</Text>
        </TouchableOpacity>
      </View>

      {/* DateTimePicker on native only (safe to avoid web duplicate issues) */}
      {Platform.OS !== "web" && showDate && (
        <DateTimePicker value={when} mode="date" display="default" onChange={onChangeDate} minimumDate={new Date()} />
      )}
      {Platform.OS !== "web" && showTime && (
        <DateTimePicker value={when} mode="time" display="default" onChange={onChangeTime} />
      )}

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar Agendamento</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 18 },
  input: { width: "100%", borderWidth: 1, borderColor: "#ccc", padding: 14, borderRadius: 10, marginBottom: 12 },
  label: { fontSize: 16, width: "100%", marginBottom: 6 },
  transportRow: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", width: "100%", marginBottom: 12 },
  transportButton: { paddingVertical: 10, paddingHorizontal: 12, borderRadius: 8, marginBottom: 8 },
  row: { flexDirection: "row", gap: 10, width: "100%", justifyContent: "space-between", marginBottom: 12 },
  pickerBtn: { flex: 1, backgroundColor: "#eee", paddingVertical: 12, borderRadius: 10, alignItems: "center" },
  pickerText: { fontWeight: "600", color: "#333" },
  button: { backgroundColor: "#54BFC5", paddingVertical: 14, borderRadius: 10, marginTop: 10, width: "100%", alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
