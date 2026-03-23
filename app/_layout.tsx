import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import "@/global.css";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Poppins': Poppins_400Regular,
    'Poppins-Bold': Poppins_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" translucent={true} backgroundColor="transparent" />
      <Stack screenOptions={{ 
        headerShown: false,
      }}>
        <Stack.Screen name="index" options={{ title: 'Exam Intro' }} />
        <Stack.Screen name="registration" options={{ title: 'Registration' }} />
        <Stack.Screen name="exam-info" options={{ title: 'Exam Info' }} />
        <Stack.Screen name="terms" options={{ title: 'Terms' }} />
        <Stack.Screen name="player" options={{ title: 'Exam Player' }} />
        <Stack.Screen name="completion" options={{ title: 'Exam Completion' }} />
      </Stack>
    </SafeAreaProvider>
  );
}
