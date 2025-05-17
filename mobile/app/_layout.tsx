import "../global.css";

import { PressStart2P_400Regular } from "@expo-google-fonts/press-start-2p";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { ArrowLeft } from "lucide-react-native";
import { useCallback } from "react";
import { Pressable, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const headerLeft = useCallback(() => {
    return (
      <Pressable
        onPress={() => router.back()}
        className="flex-row items-center"
      >
        <ArrowLeft color="#F231A5" />
        <Text className="font-bold text-pink">Menu</Text>
      </Pressable>
    );
  }, [router]);

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    PressStart2P_400Regular,
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerShown: true,
            headerTitleStyle: {
              color: "#F231A5",
            },
            headerStyle: {
              backgroundColor: "black",
            },
            headerLeft: headerLeft,
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="tic-tac-toe"
            options={{
              headerTitle: "Tic Tac Toe",
            }}
          />
          <Stack.Screen
            name="memory-game"
            options={{
              headerTitle: "Memory Game",
            }}
          />
          <Stack.Screen
            name="hangman-game"
            options={{
              headerTitle: "Hangman Game",
            }}
          />
          <Stack.Screen
            name="snake-game"
            options={{
              headerTitle: "Snake Game",
            }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="light" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
