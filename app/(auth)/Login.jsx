import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Login() {
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("test");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    if (email === "" || password === "") {
      Alert.alert("Fyll i alla fält");
      return;
    }
    if (email === "test@test.com" && password === "test") {
      router.replace("/");
    } else {
      Alert.alert("Inloggning misslyckades", "Fel email eller lösenord");
    }
  };

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setError("");
        setEmail("");
        setPassword("");
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  return (
    <SafeAreaView style={styles.safeArea}>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Lösenord"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <MaterialIcons
                name={showPassword ? "visibility" : "visibility-off"}
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Logga in</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#222",
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 40,
    paddingHorizontal: 20, // Add some horizontal padding
  },
  input: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 12,
    borderColor: "#f7ca90", // Light turquoise
    backgroundColor: "#ffffff", // White input for contrast
    marginBottom: 15,
    width: "100%", // Ensure it takes full width
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 10,
    height: 45,
    paddingHorizontal: 12,
    marginBottom: 20,
    borderColor: "#f7ca90", // Light turquoise
    backgroundColor: "#ffffff", // White input for contrast
    width: "100%", // Ensure it takes full width
  },
  passwordInput: {
    flex: 1,
    color: "#000",
  },
  button: {
    marginTop: 20,
    height: 45,
    borderRadius: 32,
    backgroundColor: "#111",
    borderWidth: 2,
    borderColor: "#f7ca90",
    justifyContent: "center",
    alignItems: "center",
    width: "100%", // Ensure it takes full width
    padding: 10,
  },
  buttonText: {
    color: "#f7ca89",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    marginTop: 10,
    color: "#ff4c4c", // Slightly softer red for errors
    textAlign: "center",
  },
});