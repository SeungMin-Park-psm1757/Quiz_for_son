import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  ScrollView,
} from "react-native";
import backgroundImage from "../../assets/images/background.jpg";
import { getUserDisplayName } from "../constants/appConfig";

const HomeScreen = ({ navigation }) => {
  const userName = getUserDisplayName();

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.titleContainer}>
              <Text style={styles.mainTitle}>{userName}의</Text>
              <Text style={[styles.mainTitle, styles.subTitle]}>퀴즈 모험</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.actionButton, styles.startButton]}
                onPress={() => navigation.navigate("CategorySelect")}
              >
                <Text style={styles.actionButtonText}>탐험 시작! 🚀</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.recordsButton]}
                onPress={() => navigation.navigate("Records")}
              >
                <Text style={styles.actionButtonText}>나의 기록 📓</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#E8F4D9", // Match the background image's dominant green color
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingBottom: 50,
  },
  buttonContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 50,
  },
  titleContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 50,
    fontWeight: '900',
    color: '#FF6347',
    textShadowColor: 'white',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 0,
    letterSpacing: -2,
  },
  subTitle: {
    fontSize: 60,
    color: '#FFD700',
    marginTop: -10,
  },
  actionButton: {
    width: "100%",
    maxWidth: 300,
    paddingVertical: 18,
    borderRadius: 25,
    marginVertical: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  startButton: {
    backgroundColor: "#FF6347",
  },
  recordsButton: {
    backgroundColor: "#4682B4",
  },
  actionButtonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default HomeScreen;
