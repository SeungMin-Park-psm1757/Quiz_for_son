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
import { PLAYABLE_CATEGORY_OPTIONS } from "../constants/appConfig";

const CategorySelectScreen = ({ navigation }) => {
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundImage}
        resizeMode="cover"
        imageStyle={{ opacity: 1 }}
      >
        <View style={styles.overlay}>
          <SafeAreaView style={styles.container}>
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backButton}>
                  <Text style={styles.backButtonText}>🏠 홈으로</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.content}>
                <Text style={styles.title}>어떤 퀴즈를 풀어볼까?</Text>
                <Text style={styles.subtitle}>어떤 모험을 시작할까요?</Text>

                <View style={styles.buttonList}>
                  {PLAYABLE_CATEGORY_OPTIONS.map((category) => (
                    <TouchableOpacity
                      key={category.key}
                      style={[styles.categoryButton, { backgroundColor: category.color }]}
                      onPress={() => navigation.navigate("Quiz", { category: category.key })}
                    >
                      <Text style={styles.categoryButtonText}>{category.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#E8F4D9', // Match background
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.4)", // Reduced opacity since background is cleaner now
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    padding: 20,
    paddingTop: 50,
  },
  backButton: {
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 10,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  backButtonText: {
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    alignItems: "center",
    justifyContent: "flex-start", // Fix low-bias by starting from top
    paddingTop: 40, // Add top spacing
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FF6347",
    marginBottom: 5,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    fontStyle: "italic",
    marginBottom: 30,
  },
  buttonList: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
  },
  categoryButton: {
    paddingVertical: 18,
    width: "100%",
    borderRadius: 20,
    marginVertical: 8,
    alignItems: "center",
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  categoryButtonText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    flexShrink: 1,
  },
});

export default CategorySelectScreen;
