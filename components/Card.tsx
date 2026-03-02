import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export interface Task {
  id: string;
  title: string;
  description: string;
}

interface CardProps {
  task: Task;
}

const Card: React.FC<CardProps> = ({ task }) => {
  const colorScheme = useColorScheme();
  const cardBg = Colors[colorScheme ?? "light"].cardBg;
  const text = Colors[colorScheme ?? "light"].text;

  return (
    <View style={styles.container}>
      <View style={[styles.card, { backgroundColor: cardBg }]}>
        <Text style={[styles.title, { color: text }]}>Total Tasks</Text>
        <Text style={[styles.text, { color: text }]}>4</Text>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
  card: {
    padding: 20,
    borderRadius: 20,
    marginVertical: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: "80%",
    height: 150,
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "cursive",
  },
});
