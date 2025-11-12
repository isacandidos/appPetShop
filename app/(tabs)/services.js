import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, useColorScheme } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function ServicesScreen() {
  const router = useRouter();
  const theme = useColorScheme();
  const isDark = theme === "dark";

  const handleAgendar = (service) => {
    router.push({ pathname: "/agendamentos", params: { selectedService: service } });
  };

  return (
    <ScrollView style={[styles.container, isDark && styles.containerDark]} contentContainerStyle={{ paddingBottom: 40 }}>

      <Text style={[styles.title, isDark && styles.titleDark]}>Nossos Serviços</Text>
      <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
        Cuidamos do seu pet com amor e dedicação 🐾
      </Text>

      {/* BANHO */}
      <View style={[styles.card, isDark && styles.cardDark]}>
        <Image source={require("../../assets/imagens/banhochat.png")} style={styles.image} resizeMode="cover" />
        <View style={styles.cardHeader}>
          <Ionicons name="water-outline" size={28} color="#54BFC5" />
          <Text style={[styles.cardTitle, isDark && styles.textDark]}>Banho</Text>
        </View>
        <Text style={[styles.cardText, isDark && styles.textDark]}>
          Higiene completa com produtos específicos para cada pelagem.
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => handleAgendar("Banho")}>
          <Text style={styles.buttonText}>Agendar agora</Text>
        </TouchableOpacity>
      </View>

      {/* TOSA */}
      <View style={[styles.card, isDark && styles.cardDark]}>
        <Image source={require("../../assets/imagens/tosachat.png")} style={styles.image} resizeMode="cover" />
        <View style={styles.cardHeader}>
          <MaterialCommunityIcons name="scissors-cutting" size={28} color="#54BFC5" />
          <Text style={[styles.cardTitle, isDark && styles.textDark]}>Tosa</Text>
        </View>
        <Text style={[styles.cardText, isDark && styles.textDark]}>
          Profissionais especializados garantindo conforto e estilo.
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => handleAgendar("Tosa")}>
          <Text style={styles.buttonText}>Agendar agora</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  containerDark: { backgroundColor: "#121212" },

  title: { fontSize: 26, fontWeight: "700", textAlign: "center", marginTop: 10, color: "#54BFC5" },
  titleDark: { color: "#54BFC5" },

  subtitle: { fontSize: 15, textAlign: "center", marginBottom: 25, marginTop: 4, color: "#333" },
  subtitleDark: { color: "#e0e0e0" },

  card: { borderRadius: 15, padding: 18, marginBottom: 22, borderWidth: 1, borderColor: "#ddd", backgroundColor: "#fff" },
  cardDark: { backgroundColor: "#1b1b1b", borderColor: "#333" },

  image: { width: "100%", height: 200, borderRadius: 12, marginBottom: 10 },

  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  cardTitle: { fontSize: 19, fontWeight: "600", marginLeft: 8, color: "#54BFC5" },
  cardText: { fontSize: 15, lineHeight: 21, marginBottom: 12, color: "#333" },
  textDark: { color: "#e0e0e0" },

  button: { paddingVertical: 12, borderRadius: 10, alignItems: "center", backgroundColor: "#54BFC5", marginTop: 5 },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
