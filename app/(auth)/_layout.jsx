import { Tabs } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';
import React from "react";

export default function AuthLayout() {
  return (
    <Tabs
      initialRouteName="login"
      screenOptions={{
        tabBarActiveTintColor: "#1689b9",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: "#e5e5e5",
        },
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
        name="login"
        options={{
          title: "Hem",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="signup"
        options={{
          title: "profil",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
        }}
      />
    
    </Tabs>
  );
}
