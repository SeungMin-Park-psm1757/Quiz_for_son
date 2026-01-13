import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, StyleSheet, Platform } from "react-native";

import HomeScreen from "./src/screens/HomeScreen";
import CategorySelectScreen from "./src/screens/CategorySelectScreen";
import QuizScreen from "./src/screens/QuizScreen";
import ResultScreen from "./src/screens/ResultScreen";
import RecordsScreen from "./src/screens/RecordsScreen";
import LoginScreen from "./src/screens/LoginScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.rootContainer}>
      <View style={styles.appContainer}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CategorySelect"
              component={CategorySelectScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Quiz"
              component={QuizScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Result"
              component={ResultScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Records"
              component={RecordsScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Platform.OS === 'web' ? '#f0f0f0' : '#fff',
    justifyContent: 'center',
  },
  appContainer: {
    flex: 1,
    // Max width for desktop/web view to prevent "too big" look
    maxWidth: Platform.OS === 'web' ? 500 : '100%',
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    shadowColor: Platform.OS === 'web' ? "#000" : "transparent",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: Platform.OS === 'web' ? 0.2 : 0,
    shadowRadius: Platform.OS === 'web' ? 30 : 0,
    marginVertical: Platform.OS === 'web' ? 20 : 0,
    borderRadius: Platform.OS === 'web' ? 20 : 0,
    overflow: 'hidden',
  },
});
