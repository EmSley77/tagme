import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useUser } from "../../context/UserContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const router = useRouter();
  const { setUser } = useUser(); // Access the setUser function from context

  //save the data locally if remember me is checked
  const storeData = async () => {
    try {
      await AsyncStorage.setItem('remember', JSON.stringify(
        {
          email: email,
          password: password
        }
      ));
    } catch (e) {
      console.log(e);
    }
  };

  //get the data locally if remember me is checked
  const getData = async () => {
    const value = await AsyncStorage.getItem('remember');
    const parsedValue = JSON.parse(value);
    if (parsedValue !== null) {
      setEmail(parsedValue.email);
      setPassword(parsedValue.password);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Fyll i alla fält");
      return;
    }

    if (email === "test@test.com" && password === "test") {
      // Create user data object
      const userData = {
        email: email,
        password: password,
        uuid: "e58ed763-928c-4155-bee9-fdbaaadc15f3",
        name: "Emanuel Sleyman",
        image: "https://github.com/EmSley77.png",
        created_at: "2021-01-01"
      };

      // save login data to context
      setUser(userData);

      // Save remember me data if checked
      if (rememberMe) {
        await storeData();
      }

      router.replace("/(home)");
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

  useEffect(() => {
    getData();
  }, []);


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

          <View style={styles.checkboxContainer}>

            <BouncyCheckbox
              size={20}
              disableText
              fillColor="#f7ca90"
              onPress={() => setRememberMe(!rememberMe)}
            />
            <Text style={styles.checkboxText}>Kom ihåg mig</Text>
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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },

  checkboxText: {
    marginLeft: 10,
    color: "#f7ca90",
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