import { Stack, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
const RootLayout = () => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  /* This is a loading screen that will show a loading indicator and then redirect to the login screen if the user is not logged in */
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setUser(false);
    }, 2000);
    if (!isLoading && !user) {
      router.replace("/Login");
    }
  }, [isLoading, user]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0a5075" />
      </View>
    );
  }

  /* This is the main layout that will show the login screen if the user is logged in*/
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;
