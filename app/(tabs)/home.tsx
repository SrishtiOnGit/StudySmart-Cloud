import Tasks from "@/components/Tasks";
import { Colors } from "@/constants/theme";
import { db } from "@/firebaseConfig";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { getAuth } from "firebase/auth";
import {
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface Task {
  id: string;
  subject: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt?: Date;
}

const DashboardScreen = () => {
  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme ?? "light"].background;
  const titleColor = Colors[colorScheme ?? "light"].text;
  const textColor = Colors[colorScheme ?? "light"].sectext;

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const auth = getAuth();
    const userId = auth.currentUser?.uid ?? "demoUser";
    if (!userId) return;

    const tasksRef = collection(db, "users", userId, "tasks");

    const unsubscribe = onSnapshot(tasksRef, (snapshot) => {
      const fetchedTasks: Task[] = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          subject: data.subject ?? "",
          title: data.title ?? "",
          description: data.description ?? "",
          completed: data.completed ?? false,
        };
      });

      setTasks(fetchedTasks); // replaces array completely
    });

    return () => unsubscribe(); // explicitly cleanup
  }, []);
  // ✅ Update Firestore directly
  const toggleComplete = async (id: string, completed: boolean) => {
    const auth = getAuth();
    const userId = auth.currentUser?.uid ?? "demoUser";
    const taskRef = doc(db, "users", userId, "tasks", id);
    await updateDoc(taskRef, { completed });
  };

  const removeTask = async (id: string) => {
    const auth = getAuth();
    const userId = auth.currentUser?.uid ?? "demoUser";
    const taskRef = doc(db, "users", userId, "tasks", id);
    await deleteDoc(taskRef);
  };

  const editTask = async (id: string, newTitle: string) => {
    const auth = getAuth();
    const userId = auth.currentUser?.uid ?? "demoUser";
    const taskRef = doc(db, "users", userId, "tasks", id);
    await updateDoc(taskRef, { title: newTitle });
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View>
        <Text style={[styles.title, { color: titleColor }]}>Hi 👋</Text>
        <Text style={[styles.subtext, { color: textColor }]}>
          Log your tasks here!
        </Text>
      </View>
      <Tasks
        tasks={tasks}
        toggleComplete={toggleComplete}
        removeTask={removeTask}
        editTask={editTask}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 8, marginTop: 75 },
  subtext: { fontSize: 16, marginBottom: 24 },
});

export default DashboardScreen;
