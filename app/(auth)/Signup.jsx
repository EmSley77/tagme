import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
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

export default function Signup() {
  const router = useRouter();

  const [image, setImage] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [namn, setNamn] = useState("");
  const [error, setError] = useState("");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSignup = () => {
    if (!email || !password || !namn) {
      Alert.alert("Fyll i alla fält");
      return;
    }

    // Replace this with real signup logic
    console.log({ email, password, namn });
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
          <>

            <TextInput
              style={styles.input}
              placeholder="Användarnamn"
              value={namn}
              onChangeText={setNamn}
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

            <View style={styles.imageSection}>
              {image && (
                <>
                  <Image source={{ uri: image }} style={styles.avatar} />
                  <TouchableOpacity onPress={() => setImage(null)} style={styles.imageClose}>
                    <MaterialIcons name="close" size={20} color="#fff" />
                  </TouchableOpacity>
                </>
              )}

              <TouchableOpacity style={styles.button} onPress={pickImage}>
                <Text style={styles.buttonText}>
                  {image ? "Byt bild" : "Välj bild"}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSignup}>
              <Text style={styles.buttonText}>Gå Med</Text>
            </TouchableOpacity>

            <Text style={styles.error}>{error}</Text>
          </>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#222", // same background color as login
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
    borderRadius: 32,
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
    padding: 10,
    fontWeight: "bold",
  },
  error: {
    marginTop: 10,
    color: "#ff4c4c", // softer red for error
  },
  title: {
    fontSize: 24,
    color: "#f7ca90",
    marginBottom: 20,
    fontWeight: "bold",
  },

  imageSection: {
    alignItems: "center",
    marginVertical: 15,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },

  imageClose: {
    position: "absolute",
    top: 5,
    right: 0,
    backgroundColor: "#111",
    borderRadius: 15,
    padding: 5,
  },
});
