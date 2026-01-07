import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../assets/images/background.png")} // Placeholder background image
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>정우의 탐험 퀴즈</Text>
          <Text style={styles.subtitle}>Jung-woos Quiz Adventure</Text>

          <TouchableOpacity
            style={styles.startButton}
            onPress={() => navigation.navigate("CategorySelect")} // Placeholder for navigation
          >
            <Text style={styles.startButtonText}>탐험 시작!</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Semi-transparent overlay
  },
  content: {
    alignItems: "center",
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#FFD700", // Bright yellow
    marginBottom: 10,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  subtitle: {
    fontSize: 24,
    color: "#32CD32", // Lime green
    marginBottom: 40,
    fontStyle: "italic",
  },
  startButton: {
    backgroundColor: "#FF6347", // Tomato red for a large, inviting button
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginTop: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  startButtonText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFFFF",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default HomeScreen;

