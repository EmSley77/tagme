import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
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
      setError("Fyll i alla fält");
      return;
    }
    if (email === "test@test.com" && password === "test") {
      router.replace("/");
    } else {
      setError("Fel email eller lösenord");
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
          <Text style={styles.error}>{error}</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 40,
  },
  input: {
    borderWidth: 2,
    width: "80%",
    borderRadius: 10,
    padding: 10,
    height: 45,
    marginBottom: 20,
    borderColor: "#8ec3b3",  // Green border color
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 10,
    width: "80%",
    height: 45,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderColor: "#8ec3b3",  // Green border color
  },
  passwordInput: {
    flex: 1,
  },
  button: {
    marginTop: 10,
    width: "80%",
    height: 45,
    borderRadius: 10,
    backgroundColor: "#4d918f",  // Bright green button color
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    marginTop: 10,
    color: "#D32F2F",  // Red color for error messages
  },
});
