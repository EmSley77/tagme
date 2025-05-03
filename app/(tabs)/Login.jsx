import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("test");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleLogin = () => {
    console.log("handleLogin called"); // Check if it triggers automatically
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
    console.log("useEffect triggered", email, password);
    if (error) {
      const timeout = setTimeout(() => {
        setError("");
        setEmail("");
        setPassword("");
        return () => clearTimeout(timeout);
      }, 3000);
    }
  }, [error]); // Add more dependencies if needed

  console.log(email, password);

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <View
          style={{
            marginBottom: 20,
            borderWidth: 2,
            borderRadius: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "80%",
            height: 45,
          }}
        >
          <TextInput
            style={[styles.input, { borderWidth: 0, marginBottom: 0 }]}
            placeholder="Password"
            secureTextEntry={showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={{
              padding: 10,
              borderRadius: 10,
            }}
          >
            {showPassword ? (
              <MaterialIcons name="visibility-off" size={24} color="black" />
            ) : (
              <MaterialIcons name="visibility" size={24} color="black" />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Logga in</Text>
        </TouchableOpacity>
        <Text style={styles.error}>{error}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 2,
    width: "80%",
    borderRadius: 10,
    padding: 10,
    height: 40,
    marginBottom: 20,
  },
  error: {
    marginTop: 10,
    color: "red",
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    width: "80%",
    height: 45,
    borderRadius: 10,
    backgroundColor: "#0a5075",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
