import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import backgroundImage from "../../assets/images/background.jpg";
import {
  DEFAULT_USER_ID,
  getCategoryMeta,
  getUserDisplayName,
} from "../constants/appConfig";
import { getUserLifetimeStats } from "../services/historyService";

const ResultScreen = ({ navigation }) => {
  const route = useRoute();
  const { totalQuestions, correctAnswersCount, category } = route.params;

  const userId = DEFAULT_USER_ID;
  const userName = getUserDisplayName();
  const categoryMeta = getCategoryMeta(category);
  const [lifetimeStats, setLifetimeStats] = useState({
    totalAttempts: 0,
    completedAttempts: 0,
    totalCorrectAnswers: 0,
    averageAccuracy: 0,
  });

  useEffect(() => {
    let isMounted = true;

    const loadLifetimeStats = async () => {
      try {
        const stats = await getUserLifetimeStats(userId);
        if (isMounted) {
          setLifetimeStats(stats);
        }
      } catch (error) {
        console.error("Error fetching lifetime history:", error);
      }
    };

    loadLifetimeStats();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  const percentage = totalQuestions > 0 ? (correctAnswersCount / totalQuestions) * 100 : 0;

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.content}>
              <Text style={styles.title}>{userName}의 탐험 완료! 🏆</Text>

              <View style={styles.resultCard}>
                <Text style={styles.categoryName}>{categoryMeta.shortLabel}</Text>

                <View style={[styles.scoreCircle, { backgroundColor: percentage > 70 ? "#2ECC71" : "#FF6347" }]}>
                  <Text style={styles.scoreNumber}>{correctAnswersCount}</Text>
                  <Text style={styles.scoreTotal}>/ {totalQuestions}</Text>
                </View>

                <Text style={styles.congratsText}>
                  {correctAnswersCount === 10 ? "우와, 전설의 탐험가예요! 🏆👑" :
                    correctAnswersCount >= 3 ? `${correctAnswersCount}문제 맞혔어요! 대단해요! 🌟` :
                      `${correctAnswersCount}개 맞혔어요! 조금 아쉽지만 노력하면 더 잘할 수 있어요! 💪`}
                </Text>
              </View>

              <View style={styles.progressCard}>
                <Text style={styles.progressTitle}>{userName}의 누적 기록</Text>
                <View style={styles.progressRow}>
                  <Text style={styles.progressLabel}>완료한 탐험</Text>
                  <Text style={styles.progressValue}>{lifetimeStats.completedAttempts}회</Text>
                </View>
                <View style={styles.progressRow}>
                  <Text style={styles.progressLabel}>누적 정답</Text>
                  <Text style={styles.progressValue}>{lifetimeStats.totalCorrectAnswers}개</Text>
                </View>
                <View style={styles.progressRow}>
                  <Text style={styles.progressLabel}>평균 정답률</Text>
                  <Text style={styles.progressValue}>{lifetimeStats.averageAccuracy}%</Text>
                </View>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.retryButton]}
                  onPress={() => navigation.replace("Quiz", { category, userId })}
                >
                  <Text style={styles.actionButtonText}>🔄 다시 도전하기</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionButton, styles.categoryButton]}
                  onPress={() => navigation.navigate("CategorySelect", { userId })}
                >
                  <Text style={styles.actionButtonText}>📚 다른 카테고리</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionButton, styles.homeButton]}
                  onPress={() => navigation.navigate("Home")}
                >
                  <Text style={[styles.actionButtonText, styles.homeButtonText]}>🏠 홈으로 가기</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
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
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 20,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    width: "100%",
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
    marginBottom: 8,
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
  buttonContainer: {
    width: "100%",
    maxWidth: 400,
    marginTop: 20,
    gap: 15,
  },
  actionButton: {
    width: "100%",
    paddingVertical: 18,
    borderRadius: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  retryButton: {
    backgroundColor: "#FFD700", // Gold
    marginBottom: 10,
  },
  categoryButton: {
    backgroundColor: "#32CD32", // LimeGreen
    marginBottom: 10,
  },
  homeButton: {
    backgroundColor: "#4682B4", // SteelBlue
  },
  actionButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333", // Default dark for visibility on light/gold buttons
  },
  homeButtonText: {
    color: "#FFF", // White text for dark button
  },
});

export default ResultScreen;
