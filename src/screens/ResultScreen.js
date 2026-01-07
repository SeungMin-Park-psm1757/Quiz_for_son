import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { db } from "../config/firebaseConfig";

const ResultScreen = ({ navigation }) => {
  const route = useRoute();
  const { totalQuestions, correctAnswersCount, category } = route.params;

  const [userTotalCorrect, setUserTotalCorrect] = useState(0);
  const [userQuizzesCompleted, setUserQuizzesCompleted] = useState(0);
  const userId = "jungwoo_explorer";

  useEffect(() => {
    const fetchUserProgress = async () => {
      if (!db) return;
      try {
        const userProgressRef = db.collection("user_progress").doc(userId);
        const doc = await userProgressRef.get();
        if (doc.exists) {
          const data = doc.data();
          setUserTotalCorrect(data.totalCorrectAnswers || 0);
          setUserQuizzesCompleted(data.quizzesCompleted || 0);
        }
      } catch (error) {
        console.error("Error fetching user progress: ", error);
      }
    };
    fetchUserProgress();
  }, []);

  const percentage = totalQuestions > 0 ? (correctAnswersCount / totalQuestions) * 100 : 0;

  return (
    <ImageBackground
      source={require("../assets/images/background.png")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.title}>탐험 완료! 🏆</Text>

            <View style={styles.resultCard}>
              <Text style={styles.categoryName}>
                {category === "fish_marine" ? "물고기 친구들" :
                  category === "animals" ? "동물 친구들" :
                    category === "dinosaurs" ? "공룡의 세계" :
                      category === "insects" ? "꿈틀꿈틀 곤충" : category.toUpperCase()}
              </Text>

              <View style={[styles.scoreCircle, { backgroundColor: percentage > 70 ? "#2ECC71" : "#FF6347" }]}>
                <Text style={styles.scoreNumber}>{correctAnswersCount}</Text>
                <Text style={styles.scoreTotal}>/ {totalQuestions}</Text>
              </View>

              <Text style={styles.congratsText}>
                {percentage === 100 ? "완벽해요! 당신은 퀴즈 왕! 👑" :
                  percentage > 70 ? "정말 잘했어요! 훌륭해요! ✨" :
                    "조금 더 노력하면 할 수 있어요! 화이팅! 💪"}
              </Text>
            </View>

            <View style={styles.progressCard}>
              <Text style={styles.progressTitle}>박정우 탐험가님의 성장 기록</Text>
              <View style={styles.progressRow}>
                <Text style={styles.progressLabel}>총 맞춘 문제:</Text>
                <Text style={styles.progressValue}>{userTotalCorrect}개</Text>
              </View>
              <View style={styles.progressRow}>
                <Text style={styles.progressLabel}>총 완료한 퀴즈:</Text>
                <Text style={styles.progressValue}>{userQuizzesCompleted}개</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.homeButton}
              onPress={() => navigation.popToTop()}
            >
              <Text style={styles.homeButtonText}>🏠 홈으로 돌아가기</Text>
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
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#FF6347",
    marginBottom: 20,
  },
  resultCard: {
    backgroundColor: "white",
    width: "100%",
    maxWidth: 400,
    padding: 25,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  categoryName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#666",
    marginBottom: 15,
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  scoreNumber: {
    fontSize: 48,
    fontWeight: "bold",
    color: "white",
  },
  scoreTotal: {
    fontSize: 18,
    color: "white",
    marginTop: -5,
  },
  congratsText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    lineHeight: 26,
  },
  progressCard: {
    backgroundColor: "rgba(70, 130, 180, 0.1)",
    width: "100%",
    maxWidth: 400,
    padding: 20,
    borderRadius: 20,
    marginBottom: 30,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4682B4",
    marginBottom: 10,
    textAlign: "center",
  },
  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  progressLabel: {
    fontSize: 15,
    color: "#555",
  },
  progressValue: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
  },
  homeButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 18,
    paddingHorizontal: 50,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
  },
  homeButtonText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
});

export default ResultScreen;
