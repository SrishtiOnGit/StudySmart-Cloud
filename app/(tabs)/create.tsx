import { Colors } from "@/constants/theme";
import { db } from "@/firebaseConfig";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { router } from "expo-router"; // ✅ use router instead of useNavigation
import { getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const AddTask = () => {
  const [subject, setSubject] = useState("");
  const [task, setTask] = useState("");
  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme ?? "light"].tint;
  const titleColor = Colors[colorScheme ?? "light"].text;

  const handleAdd = async () => {
    if (!subject.trim() || !task.trim()) {
      Alert.alert("Missing fields", "Please enter both subject and task.");
      return;
    }

    try {
      const auth = getAuth();
      const userId = auth.currentUser?.uid ?? "demoUser";

      // Firestore reference
      const tasksRef = collection(db, "users", userId, "tasks");

      // Add new task document
      await addDoc(tasksRef, {
        subject,
        title: task,
        completed: false,
        createdAt: new Date(),
      });

      // ✅ Navigate safely after saving
      router.replace("/(tabs)/home"); // always go back to tabs/dashboard
      // or use router.back() if you want to return to the previous screen
    } catch (error) {
      console.error("Error adding task: ", error);
      Alert.alert("Error", "Could not add task. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: titleColor }]}>
        Add new tasks here!
      </Text>
      <TextInput
        placeholder="Enter subject"
        value={subject}
        onChangeText={setSubject}
        style={[styles.input, { backgroundColor, color: titleColor }]}
      />
      <TextInput
        placeholder="Enter task"
        value={task}
        onChangeText={setTask}
        style={[styles.input, { backgroundColor, color: titleColor }]}
      />
      <TouchableOpacity
        onPress={handleAdd}
        style={[styles.button, { backgroundColor }]}
      >
        <Text style={{ color: titleColor }}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    width: "80%",
    margin: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    fontFamily: "cursive",
    marginBottom: 50,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
    alignSelf: "center",
  },
});
