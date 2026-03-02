import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Task {
  id: string;
  subject: string;
  title: string;
  description?: string;
  completed: boolean;
}

interface Props {
  tasks: Task[];
  toggleComplete: (id: string, completed: boolean) => void;
  removeTask: (id: string) => void;
  editTask: (id: string, newTitle: string) => void;
}

export default function Tasks({
  tasks,
  toggleComplete,
  removeTask,
  editTask,
}: Props) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={
        <Text style={[styles.emptyText, { color: theme.sectext }]}>
          No tasks yet 👀
        </Text>
      }
      renderItem={({ item }) => (
        <View
          style={[
            styles.card,
            { backgroundColor: theme.cardBg ?? theme.background },
          ]}
        >
          <TouchableOpacity
            onPress={() => toggleComplete(item.id, !item.completed)}
          >
            <Text
              style={[
                styles.title,
                { color: theme.text },
                item.completed && styles.completed,
              ]}
            >
              {item.title}
            </Text>
          </TouchableOpacity>

          {item.description ? (
            <Text style={[styles.description, { color: theme.sectext }]}>
              {item.description}
            </Text>
          ) : null}

          <View style={styles.actions}>
            <TouchableOpacity onPress={() => editTask(item.id, "Updated Task")}>
              <Text style={styles.edit}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => removeTask(item.id)}>
              <Text style={styles.delete}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
}
const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 14,
    borderRadius: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  description: {
    marginTop: 6,
    fontSize: 14,
  },
  completed: {
    textDecorationLine: "line-through",
    opacity: 0.6,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
  },
  edit: {
    marginTop: 10,
    color: "#4da6ff",
    fontWeight: "500",
  },
  delete: {
    marginTop: 10,
    color: "#ff4d4d",
    fontWeight: "500",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 60,
    fontSize: 16,
  },
});
