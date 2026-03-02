import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"; // Import Alert for error messages
// Import auth from your firebaseConfig file
import { createUserWithEmailAndPassword } from "firebase/auth"; // Import the function for creating users
import { auth } from "../firebaseConfig"; // Adjust path as needed

const SignUpScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme ?? "light"].background;
  const textInputBg = Colors[colorScheme ?? "light"].tint;
  const text = Colors[colorScheme ?? "light"].text;

  const handleAuth = async () => {
    try {
      // You might want to store the name in Firestore or as part of a user profile later
      // For now, let's focus on email and password authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      console.log("User signed up:", user);
      Alert.alert("Success", "Account created successfully!");
      onPress();
    } catch (error: any) {
      console.error("Sign-up error:", error.message);
      Alert.alert("Sign-up Error", error.message);
    }
  };

  const onPress = () => {
    router.replace("/(tabs)/home");
  };

  return (
    <View style={[styles.constainer, { backgroundColor }]}>
      <Image
        style={{ width: 250, height: 250 }}
        source={require("../assets/images/logo.png")}
      />
      <Text style={[styles.text, { color: text }]}>Sign Up Here!</Text>
      <TextInput
        style={[styles.textInput, { backgroundColor: textInputBg }]}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        placeholderTextColor={text}
      />
      <TextInput
        style={[styles.textInput, { backgroundColor: textInputBg }]}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor={text}
      />
      <TextInput
        style={[styles.textInput, { backgroundColor: textInputBg }]}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor={text}
      />
      <TouchableOpacity
        onPress={() => router.replace("/login")}
        style={{ alignItems: "flex-end" }}
      >
        <Text style={[styles.Signuptxt, { color: text }]}>
          Already have an account? Login Here
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: textInputBg }]}
        onPress={handleAuth}
      >
        <Text style={styles.buttontxt}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    width: "70%",
    height: 50,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 30,
    paddingHorizontal: 20,
    borderColor: "gray",
    borderWidth: 1,
    color: "black",
  },
  text: {
    fontFamily: "cursive",
    fontSize: 30,
    fontWeight: "600",
    marginBottom: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    marginTop: 20,
  },
  buttontxt: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  Signuptxt: {
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 10,
    marginTop: 5,
    textAlign: "right",
    width: "70%",
  },
});
