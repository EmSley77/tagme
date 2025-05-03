import React, { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { ActivityIndicator, View } from "react-native";

const RootLayout = () => {
  const [user, setUser] = useState(null); // Replace with actual user state logic
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    // Simulate checking for user session
    const timeout = setTimeout(() => {
      setIsLoading(false);
      // You should check if the user is logged in here
      // For now, we'll assume there's no user (set `user` to `false` to simulate logged out)
      setUser(false);  // Change this to check if user exists in your auth logic
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (user === false) {
        // If the user is not logged in, show the auth section
        router.replace("/(auth)/login");
      } else if (user) {
        // If the user is logged in, show the home section
        router.replace("/(home)");
      }
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0a5075" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }} />
  );
};

export default RootLayout;
