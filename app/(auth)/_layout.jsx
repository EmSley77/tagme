import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from "expo-router";
import React from "react";

export default function AuthLayout() {
  return (
    <Tabs
      initialRouteName="login"
      screenOptions={{
        tabBarActiveTintColor: "#f7ca89",
        tabBarInactiveTintColor: "#aaa",
        tabBarStyle: {
          backgroundColor: "#111", // djup grön-blå
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        headerStyle: {
          backgroundColor: "#111", // mörkare topp
        },
        headerTintColor: "#ffffff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Tabs.Screen
        name="login"
        options={{
          title: "Logga In",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="signup"
        options={{
          title: "Skapa Konto",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
        }}
      />

    </Tabs>
  );
}
