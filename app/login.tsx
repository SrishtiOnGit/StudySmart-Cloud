import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { app } from "../firebaseConfig";

const auth = getAuth(app);

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme ?? "light"].background;
  const textInputBg = Colors[colorScheme ?? "light"].tint;
  const text = Colors[colorScheme ?? "light"].text;

  const handleAuth = async () => {
    try {
      if (isLogin) {
        // Sign In
        await signInWithEmailAndPassword(auth, email, password);
        Alert.alert("Success", "Logged in successfully!");
        router.replace("/(tabs)/home");
      } else {
        // Sign Up
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert("Success", "Account created successfully!");
        setIsLogin(true);
      }
    } catch (error) {
      // Handle different Firebase authentication errors
      let errorMessage = "An unknown error occurred.";
      const err = error as any;
      if (err.code === "auth/invalid-email") {
        errorMessage = "That email address is invalid!";
      } else if (err.code === "auth/user-disabled") {
        errorMessage = "This user account has been disabled.";
      } else if (
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password"
      ) {
        errorMessage = "Invalid email or password.";
      } else if (err.code === "auth/email-already-in-use") {
        errorMessage = "That email address is already in use!";
      } else if (err.code === "auth/weak-password") {
        errorMessage = "Password should be at least 6 characters.";
      }
      console.error("Authentication error:", error);
      Alert.alert("Authentication Error", errorMessage);
    }
  };

  return (
    <View style={[styles.constainer, { backgroundColor }]}>
      <Image
        style={{ width: 250, height: 250 }}
        source={require("../assets/images/logo.png")}
      />
      <Text style={[styles.text, { color: text }]}>Login Here!</Text>
      <TextInput
        style={[styles.textInput, { backgroundColor: textInputBg }]}
        placeholder="email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholderTextColor={text}
      />
      <TextInput
        style={[styles.textInput, { backgroundColor: textInputBg }]}
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor={text}
      />
      <TouchableOpacity
        onPress={() => router.replace("/signup")}
        style={{ alignItems: "flex-end" }}
      >
        <Text style={[styles.Signuptxt, { color: text }]}>
          {"Don't have an account? Sign Up"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: textInputBg }]}
        onPress={handleAuth}
      >
        <Text style={styles.buttontxt}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

export const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    width: "70%",
    height: "5%",
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 30,
    borderColor: "yellow",
    shadowColor: "black",
  },
  text: {
    fontFamily: "cursive",
    fontSize: 30,
    fontWeight: 600,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 20,
  },
  buttontxt: {
    fontSize: 16,
    fontWeight: 600,
    color: "#fff",
  },
  Signuptxt: {
    fontSize: 16,
    fontWeight: 400,
    marginBottom: 10,
    marginTop: 5,
    textAlign: "right",
  },
});
