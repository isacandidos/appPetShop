import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, useColorScheme } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();
  const theme = useColorScheme();
  const isDark = theme === "dark";

  const handleAdminAccess = () => {
    router.push("/admin");
  };

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <Image
        source={require("../../assets/imagens/dogvipprincipal.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={[styles.title, isDark && styles.titleDark]}>Dog VIP</Text>
      <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
        Cuidando do seu pet com carinho 🐾
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/services")}>
        <Text style={styles.buttonText}>Ver serviços</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.sec]} onPress={() => router.push("/agendamentos")}>
        <Text style={styles.buttonText}>Agendar</Text>
      </TouchableOpacity>
      {/* 👇 Botão pequeno para Admin */}
      <TouchableOpacity onPress={handleAdminAccess} style={styles.adminButton}>
        <Text style={[styles.adminText, { color: isDark ? "#888" : "#666" }]}>Admin</Text>
      </TouchableOpacity>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20, backgroundColor: "#fff" },
  containerDark: { backgroundColor: "#121212" },

  logo: { width: 180, height: 180, borderRadius: 90, borderWidth: 3, borderColor: "#54BFC5", backgroundColor:"#54BFC5" ,marginBottom: 20 },

  title: { fontSize: 28, fontWeight: "bold", color: "#54BFC5" },
  titleDark: { color: "#54BFC5" },

  subtitle: { fontSize: 16, color: "#333", marginTop: 6, marginBottom: 24, textAlign: "center" },
  subtitleDark: { color: "#fff" },

  button: { backgroundColor: "#54BFC5", paddingVertical: 12, paddingHorizontal: 28, borderRadius: 24, marginVertical: 6 },
  sec: { backgroundColor: "#3AA7AD" },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  adminButton: { marginTop: 50, padding: 6 },
  adminText: { fontSize: 12, fontWeight: "600" },
});
