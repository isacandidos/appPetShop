import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: "#54BFC5",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        tabBarActiveTintColor: "#54BFC5",
        tabBarInactiveTintColor: "#95a5a6",
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopColor: "#dcdde1",
          height: 65,
          paddingBottom: 8,
          paddingTop: 5,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";

          if (route.name === "index") {
            iconName = "home-outline";
          } else if (route.name === "services") {
            iconName = "paw-outline";
          } else if (route.name === "agendamentos") {
            iconName = "calendar-outline";
          } else if (route.name === "appointments") {
            iconName = "list-outline";
          } else if (route.name === "contact") {
            iconName = "call-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarLabel: "Início",
        }}
      />

      <Tabs.Screen
        name="services"
        options={{
          title: "Serviços",
          tabBarLabel: "Serviços",
        }}
      />

      <Tabs.Screen
        name="agendamentos"
        options={{
          title: "Agendar",
          tabBarLabel: "Agendar",
        }}
      />

      <Tabs.Screen
        name="appointment"
        options={{
          title: "Meus Agendamentos",
          tabBarLabel: "Meus Agendamentos", // 👈 nome exibido na barra
        }}
      />

      <Tabs.Screen
        name="contact"
        options={{
          title: "Contato",
          tabBarLabel: "Contato",
        }}
      />
    </Tabs>
  );
}


