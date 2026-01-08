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
    { name: "물고기 친구들 🐠", key: "fish_marine", color: "#4682B4" },
    { name: "동물 친구들 🦁", key: "animals", color: "#FFD700" },
    { name: "공룡의 세계 🦖", key: "dinosaurs", color: "#228B22" },
    { name: "꿈틀꿈틀 곤충 🦋", key: "insects", color: "#BA55D3" },
  ];

  return (
    <ImageBackground
      source={require("../../assets/images/background.png")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title}>카테고리 선택</Text>
              <Text style={styles.subtitle}>어떤 모험을 시작할까요?</Text>
            </View>

            <View style={styles.buttonList}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.key}
                  style={[styles.categoryButton, { backgroundColor: category.color }]}
                  onPress={() => navigation.navigate("Quiz", { category: category.key })}
                >
                  <Text style={styles.categoryButtonText}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backLink}>
              <Text style={styles.backLinkText}>돌아가기</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.85)", // Light overlay for readability
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FF6347",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    fontStyle: "italic",
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
    flexShrink: 1, // Prevent wrapping if possible
  },
  backLink: {
    marginTop: 30,
    padding: 10,
  },
  backLinkText: {
    fontSize: 16,
    color: "#666",
    textDecorationLine: "underline",
  },
});

export default CategorySelectScreen;

