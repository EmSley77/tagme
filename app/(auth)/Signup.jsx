import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function Signup() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [namn, setNamn] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSignup = () => {
    if (!email || !password || !namn || !phone) {
      Alert.alert("Fyll i alla fält");
      return;
    }

    // Replace this with real signup logic
    console.log({ email, password, namn, telefon: phone });
    router.replace("/home");
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }, [error]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, width: "100%" }}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <TextInput
            style={styles.input}
            placeholder="Namn"
            value={namn}
            onChangeText={setNamn}
          />
          <TextInput
            style={styles.input}
            placeholder="Telefonnummer"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Lösenord"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Gå Med</Text>
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
    backgroundColor: "#444", // same background color as login
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 40,
  },
  input: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    width: "80%",
    borderColor: "#f7ca90", // matching light turquoise
    backgroundColor: "#ffffff", // white input for contrast
    color: "#333",
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    width: "80%",
    height: 45,
    borderRadius: 10,
    backgroundColor: "#111", // same dark button color as login
    borderWidth: 2,
    borderColor: "#f7ca90", // light turquoise
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#f7ca89", // matching light gold color
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    marginTop: 10,
    color: "#ff4c4c", // softer red for error
  },
});
