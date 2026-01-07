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
      source={require("../assets/images/background.png")}
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => navigation.navigate("CategorySelect")}
          >
            <Text style={styles.startButtonText}>탐험 시작!</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.recordsButton}
            onPress={() => navigation.navigate("Records")}
          >
            <Text style={styles.recordsButtonText}>나의 기록 📓</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end', // Move buttons to the bottom to not cover the character
    alignItems: 'center',
    paddingBottom: 80,
  },
  content: {
    alignItems: 'center',
    width: '100%',
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
    backgroundColor: "#FF6347",
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 30,
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
  recordsButton: {
    backgroundColor: "#4682B4",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  recordsButtonText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});

export default HomeScreen;

