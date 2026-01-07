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
  const userId = "jungwoo_explorer"; // Ensure this matches the ID used in QuizScreen

  useEffect(() => {
    const fetchUserProgress = async () => {
      if (!db) {
        console.warn("Firebase Firestore is not initialized. Cannot fetch user progress.");
        return;
      }
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
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>퀴즈 결과!</Text>
          <Text style={styles.categoryText}>카테고리: {category.toUpperCase()}</Text>

          <View style={styles.scoreCard}>
            <Text style={styles.scoreText}>맞춘 개수: {correctAnswersCount} / {totalQuestions}</Text>
            <Text style={styles.percentageText}>정확도: {percentage.toFixed(0)}%</Text>
          </View>

          <View style={styles.globalProgressCard}>
            <Text style={styles.globalProgressTitle}>정우 탐험가님의 총 기록</Text>
            <Text style={styles.globalProgressText}>총 맞춘 문제: {userTotalCorrect}개</Text>
            <Text style={styles.globalProgressText}>총 완료한 퀴즈: {userQuizzesCompleted}개</Text>
          </View>

          {/* Placeholder for Badge Animation (Task 9) */}
          {/* {showBadgePopup && <BadgePopup badge={awardedBadge} onClose={() => setShowBadgePopup(false)} />} */}

          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => navigation.popToTop()} // Go back to the Home Screen
          >
            <Text style={styles.homeButtonText}>홈으로 돌아가기</Text>
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
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  content: {
    alignItems: "center",
    width: "90%",
    padding: 20,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#FF6347", // Tomato
    marginBottom: 10,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  categoryText: {
    fontSize: 22,
    color: "#4682B4", // SteelBlue
    marginBottom: 20,
  },
  scoreCard: {
    backgroundColor: "#FFEB3B", // Yellow
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  scoreText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 5,
  },
  percentageText: {
    fontSize: 24,
    color: "#333333",
  },
  globalProgressCard: {
    backgroundColor: "#E0E0E0", // Light gray
    padding: 15,
    borderRadius: 15,
    marginBottom: 30,
    width: "100%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CCCCCC",
  },
  globalProgressTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#555555",
    marginBottom: 10,
  },
  globalProgressText: {
    fontSize: 18,
    color: "#555555",
    marginBottom: 5,
  },
  homeButton: {
    backgroundColor: "#32CD32", // LimeGreen
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  homeButtonText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});

export default ResultScreen;
