import { Ionicons } from "@expo/vector-icons";
import { Alert, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ContactScreen() {
  const phoneNumber = "+5548988802661"; // altere para seu número
  const whatsappNumber = "5548988802661"; // sem o '+'
  const instagramUrl = "https://www.instagram.com/dogvip_esteticaanimal"; // altere para o perfil do petshop
  const address = "R. Apóstolo Paschoal, 726 - Canasvieiras - Florianópolis, SC, 88054-101, Brasil";

  const openWhatsApp = async () => {
    const url = `https://wa.me/${whatsappNumber}`;
    const supported = await Linking.canOpenURL(url);
    supported ? Linking.openURL(url) : Alert.alert("Erro", "Não foi possível abrir o WhatsApp.");
  };

  const makeCall = async () => {
    const url = `tel:${phoneNumber}`;
    const supported = await Linking.canOpenURL(url);
    supported ? Linking.openURL(url) : Alert.alert("Erro", "Não foi possível fazer a ligação.");
  };

  const openInstagram = async () => {
    const supported = await Linking.canOpenURL(instagramUrl);
    supported ? Linking.openURL(instagramUrl) : Alert.alert("Erro", "Não foi possível abrir o Instagram.");
  };

  const openMaps = async () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    const supported = await Linking.canOpenURL(url);
    supported ? Linking.openURL(url) : Alert.alert("Erro", "Não foi possível abrir o mapa.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entre em Contato</Text>
      <Text style={styles.subtitle}>Escolha uma das opções abaixo</Text>

      <TouchableOpacity style={styles.button} onPress={openWhatsApp}>
        <Ionicons name="logo-whatsapp" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Chamar no WhatsApp</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={makeCall}>
        <Ionicons name="call-outline" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Ligar Agora</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={openInstagram}>
        <Ionicons name="logo-instagram" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Visitar Instagram</Text>
      </TouchableOpacity>

      <View style={styles.addressContainer}>
        <Ionicons name="location-outline" size={26} color="#54BFC5" style={styles.addressIcon} />
        <Text style={styles.addressText}>{address}</Text>
      </View>

      <TouchableOpacity style={[styles.button, styles.mapButton]} onPress={openMaps}>
        <Ionicons name="map-outline" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Ver no Google Maps</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FAFA",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: "#333",
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#54BFC5",
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 30,
    marginVertical: 8,
    width: "80%",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  mapButton: {
    marginTop: 20,
    backgroundColor: "#3AA7AD",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  icon: {
    marginRight: 10,
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
    paddingHorizontal: 20,
  },
  addressText: {
    fontSize: 15,
    color: "#333",
    textAlign: "center",
    flex: 1,
  },
  addressIcon: {
    marginRight: 8,
  },
});
