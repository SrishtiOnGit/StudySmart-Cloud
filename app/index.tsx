import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Text, useColorScheme } from 'react-native';
import { Image } from "expo-image";
import { useRouter } from "expo-router";   // ✅ useRouter instead of router
import { Colors } from '@/constants/theme';


export default function WelcomeScreen() {
  const progress = useRef(new Animated.Value(0)).current;
  const router = useRouter();
 const colorScheme = useColorScheme();
    const backgroundColor = Colors[colorScheme ?? 'light'].background;
    const text = Colors[colorScheme ?? 'light'].text;

  useEffect(() => {
    // Animate progress from 0 to 100% over 3 seconds
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start(() => {
      // After animation completes, navigate to login
      router.replace("/login");   // ✅ replace so user can't go back to welcome
    });
  }, []);

  const widthInterpolated = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <Image
        style={{ width: 500, height: 500 }}
        source={require('../assets/images/logo.png')}
      />
      <Text style={[styles.text, {color : text} ]}>Welcome to StudySmart-Cloud!</Text>
      <View style={styles.progressBackground}>
        <Animated.View style={[styles.progressFill, { width: widthInterpolated }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  progressBackground: {
    width: '80%',
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: 10,
    backgroundColor: '#3b82f6',
  },
  text: {
    fontFamily: 'cursive',
    fontWeight: '600',
    fontSize: 28,
    marginTop: 20,
    marginBottom: 100,
  },
});