import { Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { UserProvider, useUser } from "../context/UserContext";

function RootLayoutNav() {
  const { user } = useUser();
  const router = useRouter();

  const isLoggedIn = () => {
    setTimeout(() => {
      if (user) {
        router.replace("/(home)");
      } else {
        router.replace("/(auth)/login");
      }
    }, 100);
  }

  useEffect(() => {
    isLoggedIn();
  }, []);


  return (
    <Stack screenOptions={{ headerShown: false }} />
  );
}

export default function RootLayout() {
  return (
    <UserProvider>
      <RootLayoutNav />
    </UserProvider>
  );
}
