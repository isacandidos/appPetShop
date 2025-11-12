import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Alert, Linking, StyleSheet, Text, TouchableOpacity, View, useColorScheme } from "react-native";

export default function ContactScreen() {
  const theme = useColorScheme();
  const isDark = theme === "dark";

  const phone = "+5548988802661";
  const whatsapp = "5548988802661";
  const instagram = "https://www.instagram.com/dogvip_esteticaanimal";
  const address = "R. Apóstolo Paschoal, 726 - Canasvieiras - Florianópolis, SC";

  const openUrl = async (url, failMsg) => {
    const ok = await Linking.canOpenURL(url);
    ok ? Linking.openURL(url) : Alert.alert("Erro", failMsg);
  };

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <Text style={[styles.title, isDark && styles.textDark]}>Contato</Text>
      <Text style={[styles.subtitle, isDark && styles.textDark]}>Escolha uma das opções abaixo</Text>

      <TouchableOpacity
        style={[styles.button, isDark && styles.buttonDark]}
        onPress={() => openUrl(`https://wa.me/${whatsapp}`, "Não foi possível abrir o WhatsApp.")}
      >
        <Ionicons name="logo-whatsapp" size={22} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Chamar no WhatsApp</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, isDark && styles.buttonDark]}
        onPress={() => openUrl(`tel:${phone}`, "Não foi possível iniciar a ligação.")}
      >
        <Ionicons name="call-outline" size={22} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Ligar Agora</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, isDark && styles.buttonDark]}
        onPress={() => openUrl(instagram, "Não foi possível abrir o Instagram.")}
      >
        <Ionicons name="logo-instagram" size={22} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Visitar Instagram</Text>
      </TouchableOpacity>

      <View style={styles.addressRow}>
        <Ionicons name="location-outline" size={22} color={isDark ? "#54BFC5" : "#54BFC5"} style={{ marginRight: 8 }} />
        <Text style={[styles.address, isDark && styles.textDark]}>{address}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center", justifyContent: "center", padding: 20 },
  containerDark: { backgroundColor: "#121212" },

  title: { fontSize: 24, fontWeight: "700", color: "#54BFC5", marginBottom: 6 },
  subtitle: { fontSize: 14, color: "#333", marginBottom: 24 },
  textDark: { color: "#fff" },

  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#54BFC5",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 28,
    marginVertical: 8,
    width: "80%",
    justifyContent: "center",
  },
  buttonDark: {
    backgroundColor: "#3AA7AD",
  },

  icon: { marginRight: 8 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },

  addressRow: { flexDirection: "row", alignItems: "center", marginTop: 20, paddingHorizontal: 20 },
  address: { fontSize: 14, color: "#333", textAlign: "center" },
});
