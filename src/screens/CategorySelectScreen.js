import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from "react-native";

const CategorySelectScreen = ({ navigation }) => {
  const categories = [
    { name: "물고기 친구들 🐠", key: "fish_marine", color: "#4682B4" }, // SteelBlue
    { name: "동물 친구들 🦁", key: "animals", color: "#FFD700" }, // Gold
    { name: "공룡의 세계 🦖", key: "dinosaurs", color: "#228B22" }, // ForestGreen
    { name: "꿈틀꿈틀 곤충 🦋", key: "insects", color: "#BA55D3" }, // MediumOrchid
  ];

  return (
    <ImageBackground
      source={require("../assets/images/background.png")} // Re-using the background image
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>카테고리 선택</Text>
          <Text style={styles.subtitle}>Jung-woo, choose your adventure!</Text>

          {categories.map((category) => (
            <TouchableOpacity
              key={category.key}
              style={[styles.categoryButton, { backgroundColor: category.color }]}
              onPress={() =>
                navigation.navigate("Quiz", { category: category.key })
              }
            >
              <Text style={styles.categoryButtonText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
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
    fontSize: 40,
    fontWeight: "bold",
    color: "#FF6347", // Tomato
    marginBottom: 10,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  subtitle: {
    fontSize: 20,
    color: "#4682B4", // SteelBlue
    marginBottom: 40,
    fontStyle: "italic",
  },
  categoryButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
    width: "80%", // Make buttons wider
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
  },
  categoryButtonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default CategorySelectScreen;

