import { Tabs } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';
import React from "react";

export default function AuthLayout() {
  return (
    <Tabs
      initialRouteName="login"
      screenOptions={{
        tabBarActiveTintColor: "#f7ca89",
        tabBarInactiveTintColor: "#aaa",
        tabBarStyle: {
          backgroundColor: "#285e61", // djup grön-blå
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        headerStyle: {
          backgroundColor: "#285e61", // mörkare topp
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
