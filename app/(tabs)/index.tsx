import { useRouter } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao PetShop!</Text>

      <Button title="Ver Serviços" onPress={() => router.push("/services")} />
      <Button title="Agendamentos" onPress={() => router.push("/agendamentos")} />
      <Button title="Contato" onPress={() => router.push("/contact")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: "bold",
  },
});
