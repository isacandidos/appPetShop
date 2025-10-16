import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function ServicesScreen() {
  const router = useRouter();

  // Função para ir até a tela de agendamento com o serviço pré-selecionado
  const handleAgendar = (service) => {
    router.push({
      pathname: "/agendamentos",
      params: { selectedService: service },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Nossos Serviços</Text>
      <Text style={styles.subtitle}>Cuidamos do seu pet com amor e dedicação 🐾</Text>

      {/* Banho */}
      <View style={styles.card}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1601758064226-0c3b3c47d9c9?auto=format&fit=crop&w=800&q=60",
          }}
          style={styles.image}
        />
        <View style={styles.cardHeader}>
          <Ionicons name="water-outline" size={28} color="#54BFC5" />
          <Text style={styles.cardTitle}>Banho</Text>
        </View>
        <Text style={styles.cardText}>
          O banho é essencial para manter a higiene e o bem-estar do seu pet. 
          Usamos produtos específicos para cada tipo de pelagem, garantindo limpeza, brilho e um cheirinho irresistível.
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => handleAgendar("Banho")}>
          <Text style={styles.buttonText}>Agendar agora</Text>
        </TouchableOpacity>
      </View>

      {/* Tosa */}
      <View style={styles.card}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1627873640382-37bdb8d78e4a?auto=format&fit=crop&w=800&q=60",
          }}
          style={styles.image}
        />
        <View style={styles.cardHeader}>
          <MaterialCommunityIcons name="scissors-cutting" size={28} color="#54BFC5" />
          <Text style={styles.cardTitle}>Tosa</Text>
        </View>
        <Text style={styles.cardText}>
          A tosa é feita por profissionais qualificados, respeitando o conforto e a segurança do seu animal. 
          Deixe seu pet com um visual bonito e saudável!
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => handleAgendar("Tosa")}>
          <Text style={styles.buttonText}>Agendar agora</Text>
        </TouchableOpacity>
      </View>

      {/* Cromoterapia */}
      <View style={styles.card}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1616401785405-9b8dca3b4f77?auto=format&fit=crop&w=800&q=60",
          }}
          style={styles.image}
        />
        <View style={styles.cardHeader}>
          <Ionicons name="color-palette-outline" size={28} color="#54BFC5" />
          <Text style={styles.cardTitle}>Cromoterapia</Text>
        </View>
        <Text style={styles.cardText}>
          A cromoterapia pet é uma terapia integrativa que utiliza as cores e suas vibrações
          para promover o equilíbrio físico e emocional dos animais, auxiliando em tratamentos e no bem-estar geral.
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => handleAgendar("Cromoterapia")}>
          <Text style={styles.buttonText}>Agendar agora</Text>
        </TouchableOpacity>
      </View>

      {/* Ozonioterapia */}
      <View style={styles.card}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1589927986089-35812386a3b0?auto=format&fit=crop&w=800&q=60",
          }}
          style={styles.image}
        />
        <View style={styles.cardHeader}>
          <Ionicons name="medkit-outline" size={28} color="#54BFC5" />
          <Text style={styles.cardTitle}>Ozonioterapia</Text>
        </View>
        <Text style={styles.cardText}>
          A ozonioterapia em pets é um tratamento complementar que utiliza o gás ozônio (O₃)
          para tratar dores crônicas, feridas, infecções e inflamações, com propriedades anti-inflamatórias e antimicrobianas.
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => handleAgendar("Ozonioterapia")}>
          <Text style={styles.buttonText}>Agendar agora</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FAFA",
    padding: 20,
  },
  title: {
    fontSize: 26,
    color: "#333",
    fontWeight: "700",
    textAlign: "center",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 25,
    marginTop: 5,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 15,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#54BFC5",
    marginLeft: 8,
  },
  cardText: {
    fontSize: 15,
    color: "#444",
    lineHeight: 22,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#54BFC5",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
