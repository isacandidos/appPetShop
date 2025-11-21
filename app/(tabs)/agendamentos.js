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
  ScrollView,
  useWindowDimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function AgendamentosScreen() {
  const params = useLocalSearchParams();
  const theme = useColorScheme();
  const isDark = theme === "dark";
  const { width } = useWindowDimensions();

  const isSmall = width < 360;
  const isTablet = width > 600;

  const [petName, setPetName] = useState("");
  const [service, setService] = useState("");
  const [transport, setTransport] = useState("Nenhum");
  const [address, setAddress] = useState("");
  const [when, setWhen] = useState(new Date());

  const [clientPhone, setClientPhone] = useState("");

  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const user = await AsyncStorage.getItem("userData");
      if (user) {
        setClientPhone(JSON.parse(user).phone);
      }
    };
    loadUser();
  }, []);

  useEffect(() => {
    if (params?.selectedService) {
      setService(String(params.selectedService));
    }
  }, [params]);

  const onChangeDate = (_, selected) => {
    setShowDate(false);
    if (selected) {
      const updated = new Date(when);
      updated.setFullYear(
        selected.getFullYear(),
        selected.getMonth(),
        selected.getDate()
      );
      setWhen(updated);
    }
  };

  const onChangeTime = (_, selected) => {
    setShowTime(false);
    if (selected) {
      const updated = new Date(when);
      updated.setHours(selected.getHours(), selected.getMinutes());
      setWhen(updated);
    }
  };

  const handleSave = async () => {
    if (!petName || !service || !clientPhone) {
      Alert.alert("Erro", "Erro ao identificar seu usuário.");
      return;
    }

    if (transport !== "Nenhum" && !address) {
      Alert.alert("Erro", "Informe o endereço para transporte.");
      return;
    }

    const newAppointment = {
      id: Date.now().toString(),
      petName,
      service,
      transport,
      address: transport === "Nenhum" ? "" : address,
      when: when.toISOString(),
    };

    const storageKey = `@appointments_${clientPhone}`;

    const saved = await AsyncStorage.getItem(storageKey);
    const updated = saved ? JSON.parse(saved) : [];
    updated.push(newAppointment);

    await AsyncStorage.setItem(storageKey, JSON.stringify(updated));

    Alert.alert("Sucesso", "Agendamento realizado!");

    setPetName("");
    setService("");
    setTransport("Nenhum");
    setAddress("");
    setWhen(new Date());
  };

  return (
    <ScrollView
      contentContainerStyle={{
        padding: isTablet ? 40 : 20,
        alignItems: "center",
      }}
      style={{
        backgroundColor: isDark ? "#111" : "#fff",
      }}
    >
      <View style={{ width: "100%", maxWidth: 500 }}>
        <Text style={[styles.title, { color: "#54BFC5" }]}>
          Novo Agendamento
        </Text>

        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: isDark ? "#222" : "#fff",
              color: isDark ? "#fff" : "#000",
              fontSize: isSmall ? 14 : 16,
            },
          ]}
          placeholder="Nome do Pet"
          placeholderTextColor={isDark ? "#888" : "#666"}
          value={petName}
          onChangeText={setPetName}
        />

        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: isDark ? "#222" : "#fff",
              color: isDark ? "#fff" : "#000",
            },
          ]}
          placeholder="Serviço (Banho/Tosa)"
          placeholderTextColor={isDark ? "#888" : "#666"}
          value={service}
          onChangeText={setService}
        />

        <Text style={[styles.label, { color: isDark ? "#ccc" : "#333" }]}>
          Transporte:
        </Text>

        <View style={styles.transportGrid}>
          {["Nenhum", "Levar Após Banho", "Buscar para Banho", "Buscar e Levar"].map(
            (option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.transportButton,
                  {
                    backgroundColor:
                      transport === option ? "#54BFC5" : isDark ? "#222" : "#eee",
                    flexBasis: width < 350 ? "48%" : "48%",
                  },
                ]}
                onPress={() => setTransport(option)}
              >
                <Text
                  style={{
                    color: transport === option ? "#fff" : isDark ? "#ddd" : "#333",
                    fontSize: isSmall ? 13 : 15,
                  }}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>

        {transport !== "Nenhum" && (
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: isDark ? "#222" : "#fff",
                color: isDark ? "#fff" : "#000",
              },
            ]}
            placeholder="Endereço"
            placeholderTextColor={isDark ? "#888" : "#666"}
            value={address}
            onChangeText={setAddress}
          />
        )}

        <Text style={[styles.label, { color: isDark ? "#ccc" : "#333" }]}>
          Data e Hora:
        </Text>

        <View style={styles.row}>
          <TouchableOpacity style={styles.pickerBtn} onPress={() => setShowDate(true)}>
            <Text style={styles.pickerText}>📅 {when.toLocaleDateString()}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.pickerBtn} onPress={() => setShowTime(true)}>
            <Text style={styles.pickerText}>
              ⏰{" "}
              {when.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </TouchableOpacity>
        </View>

        {showDate && (
          <DateTimePicker
            value={when}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            minimumDate={new Date()}
            onChange={onChangeDate}
          />
        )}

        {showTime && (
          <DateTimePicker
            value={when}
            mode="time"
            is24Hour
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onChangeTime}
          />
        )}

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Salvar Agendamento</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 18,
    textAlign: "center",
  },

  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },

  label: {
    fontSize: 16,
    marginBottom: 6,
    width: "100%",
  },

  transportGrid: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  transportButton: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
  },

  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  pickerBtn: {
    flex: 1,
    backgroundColor: "#eee",
    padding: 12,
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 4,
  },

  pickerText: {
    fontSize: 15,
    fontWeight: "bold",
  },

  button: {
    backgroundColor: "#54BFC5",
    width: "100%",
    padding: 14,
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
