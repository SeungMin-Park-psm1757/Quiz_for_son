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
    backgroundColor: Platform.OS === 'web' ? '#f5f5f7' : '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appContainer: {
    flex: 1,
    width: '100%',
    maxWidth: Platform.OS === 'web' ? 450 : '100%',
    maxHeight: Platform.OS === 'web' ? 850 : '100%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    // Web specific shadow and border
    ...Platform.select({
      web: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        borderRadius: 30,
        marginVertical: 20,
        borderWidth: 1,
        borderColor: '#e0e0e0',
      },
      default: {
        borderRadius: 0,
      }
    }),
    overflow: 'hidden',
  },
});
