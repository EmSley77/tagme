import React from "react";
import { Tabs } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
export default function MainLayout() {
  return (
    <Tabs
      initialRouteName="Login"
      screenOptions={{
        tabBarActiveTintColor: "#1689b9",
        tabBarInactiveTintColor: "gray",
      
        headerStyle: {
          backgroundColor: "#1689b9",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Tabs.Screen
        name="Login"
        options={{
          title: "Logga in",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="login" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Signup"
        options={{
          title: "Skapa konto",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person-add" size={size} color={color} />
          ),
        }}
      />
    
    </Tabs>
  );
}
