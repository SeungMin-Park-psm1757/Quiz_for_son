import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Animated,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import * as Speech from "expo-speech";
import Fireworks from "../components/Fireworks";
import EncouragingCharacter from "../components/EncouragingCharacter";
import QuestionVisual from "../components/QuestionVisual";
import allQuizData from "../data/quizData";
import backgroundImage from "../../assets/images/background.jpg";
import { saveQuizHistory } from "../services/historyService";
import {
  DEFAULT_USER_ID,
  getCategoryMeta,
  getUserDisplayName,
} from "../constants/appConfig";
import { selectQuestionsForYoungLearner } from "../utils/quizSelection";

const TOTAL_QUESTIONS = 10;

const QuizScreen = ({ navigation }) => {
  const route = useRoute();
  const { width } = useWindowDimensions();
  const category = route.params?.category || "animals";
  const userId = DEFAULT_USER_ID;
  const userName = getUserDisplayName();
  const theme = getCategoryMeta(category);
  const isNarrowScreen = width < 380;
  const questionImageHeight = Math.min(220, Math.max(170, width * 0.5));

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [showFireworks, setShowFireworks] = useState(false);
  const [fireworksIntensity, setFireworksIntensity] = useState(1);
  const [showEncouragingCharacter, setShowEncouragingCharacter] =
    useState(false);
  const [quizData, setQuizData] = useState([]);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasPreparedQuiz, setHasPreparedQuiz] = useState(false);

  const shimmyAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const filteredQuizzes = allQuizData.filter(
      (question) => question.category === category
    );
    const selectedQuestions = selectQuestionsForYoungLearner(
      filteredQuizzes,
      TOTAL_QUESTIONS
    );

    setQuizData(selectedQuestions);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setFeedbackMessage(null);
    setShowFireworks(false);
    setShowEncouragingCharacter(false);
    setCorrectAnswersCount(0);
    setQuestionsAnswered(0);
    setIsProcessing(false);
    setHasPreparedQuiz(true);
    Speech.stop();
  }, [category]);

  const currentQuestion = quizData[currentQuestionIndex];
  const totalQuestions = quizData.length || TOTAL_QUESTIONS;

  const speakQuestion = (text) => {
    if (!text) {
      return;
    }

    Speech.stop();
    Speech.speak(text, {
      language: "ko-KR",
      pitch: 1.05,
      rate: 0.82,
    });
  };

  useEffect(() => {
    if (currentQuestion) {
      speakQuestion(currentQuestion.question);
    }
  }, [currentQuestion]);

  useEffect(
    () => () => {
      Speech.stop();
    },
    []
  );

  const handleAnswerSelect = (index) => {
    if (isProcessing || feedbackMessage) {
      return;
    }

    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = async () => {
    if (selectedAnswer === null || isProcessing || !currentQuestion) {
      return;
    }

    setIsProcessing(true);
    Speech.stop();

    const isCorrect = selectedAnswer === currentQuestion.correctAnswerIndex;
    const updatedCorrectCount = correctAnswersCount + (isCorrect ? 1 : 0);

    setQuestionsAnswered((prev) => prev + 1);

    if (isCorrect) {
      setCorrectAnswersCount(updatedCorrectCount);

      let message = `정답! ${userName} 탐험가님, 최고예요! 🎉✨`;
      if (updatedCorrectCount >= 10) {
        message = "우와!! 10문제 모두 정답! 전설의 탐험가 탄생! 👑🌟🚀";
      } else if (updatedCorrectCount >= 8) {
        message = "대단해요! 거의 다 맞췄어요! 🌟🔥";
      } else if (updatedCorrectCount >= 5) {
        message = "멋져요! 절반이나 넘게 맞췄어요! 👍💎";
      }

      setFeedbackMessage(message);
      setShowFireworks(true);
      setFireworksIntensity(updatedCorrectCount >= 8 ? 3 : 2);

      Animated.sequence([
        Animated.timing(shimmyAnim, {
          toValue: -10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shimmyAnim, {
          toValue: 10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shimmyAnim, {
          toValue: -10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shimmyAnim, {
          toValue: 10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shimmyAnim, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      setFeedbackMessage("아쉬워요! 다시 한 번 생각해볼까요? 🤗");
      setShowEncouragingCharacter(true);
    }

    setTimeout(async () => {
      setSelectedAnswer(null);
      setFeedbackMessage(null);
      setShowFireworks(false);
      setShowEncouragingCharacter(false);

      if (currentQuestionIndex < quizData.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        await saveQuizHistory(
          userId,
          category,
          updatedCorrectCount,
          quizData.length
        );

        navigation.replace("Result", {
          totalQuestions: quizData.length,
          correctAnswersCount: updatedCorrectCount,
          category,
        });
      }

      setIsProcessing(false);
    }, 1500);
  };

  const handleQuit = () => {
    Speech.stop();

    saveQuizHistory(
      userId,
      category,
      correctAnswersCount,
      questionsAnswered,
      "cancelled"
    ).catch((error) => console.error("History save failed:", error));

    navigation.navigate("CategorySelect");
  };

  if (!hasPreparedQuiz) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>퀴즈를 준비 중이에요... 🏕️</Text>
      </View>
    );
  }

  if (quizData.length === 0 || !currentQuestion) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>
          이 카테고리의 문제를 아직 준비 중이에요.
        </Text>
        <TouchableOpacity
          style={styles.emptyStateButton}
          onPress={() => navigation.navigate("CategorySelect")}
        >
          <Text style={styles.emptyStateButtonText}>카테고리로 돌아가기</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.mainContainer,
        { backgroundColor: theme.backgroundColor },
      ]}
    >
      <ImageBackground
        source={backgroundImage}
        style={styles.contentBackground}
        imageStyle={{ opacity: 0.15 }}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.maxWidthWrapper}>
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.headerBackButton}
                onPress={handleQuit}
                hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
              >
                <Text style={styles.headerBackButtonText}>🏃 그만하기</Text>
              </TouchableOpacity>
              <View style={styles.scoreContainer}>
                <Text style={styles.scoreText}>
                  {currentQuestionIndex + 1} / {totalQuestions} | 정답:{" "}
                  {correctAnswersCount}
                </Text>
              </View>
            </View>

            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              <Text
                style={[
                  styles.categoryTitle,
                  { color: theme.accentColor },
                  isNarrowScreen && styles.categoryTitleCompact,
                ]}
              >
                {theme.shortLabel}
              </Text>
              <Text
                style={[
                  styles.categorySubtitle,
                  isNarrowScreen && styles.categorySubtitleCompact,
                ]}
              >
                쉬운 문제부터 골랐고, 사진이 없으면 힌트 카드로 보여줘요.
              </Text>

              <View style={styles.questionCard}>
                <QuestionVisual
                  question={currentQuestion}
                  category={category}
                  theme={theme}
                  height={questionImageHeight}
                />

                <Text
                  style={[
                    styles.questionText,
                    isNarrowScreen && styles.questionTextCompact,
                  ]}
                >
                  {currentQuestion.question}
                </Text>
                <TouchableOpacity
                  onPress={() => speakQuestion(currentQuestion.question)}
                  style={styles.speakerButton}
                >
                  <Text
                    style={[
                      styles.speakerIcon,
                      isNarrowScreen && styles.speakerIconCompact,
                    ]}
                  >
                    🔊 다시 읽기
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.optionsContainer}>
                {currentQuestion.options.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.optionButton,
                      selectedAnswer === index && {
                        borderColor: theme.accentColor,
                        borderWidth: 3,
                        backgroundColor: "#FFF",
                      },
                    ]}
                    onPress={() => handleAnswerSelect(index)}
                    disabled={isProcessing}
                  >
                    <Text
                      style={[
                        styles.optionButtonText,
                        isNarrowScreen && styles.optionButtonTextCompact,
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {feedbackMessage ? (
                <Animated.View
                  style={[
                    styles.feedbackOverlay,
                    { transform: [{ translateX: shimmyAnim }] },
                  ]}
                >
                  <Text
                    style={[
                      styles.feedbackText,
                      selectedAnswer === currentQuestion.correctAnswerIndex
                        ? styles.correctFeedback
                        : styles.incorrectFeedback,
                    ]}
                  >
                    {feedbackMessage}
                  </Text>
                  {selectedAnswer === currentQuestion.correctAnswerIndex && (
                    <Text style={styles.celebrationEmoji}>🏆🌟👑</Text>
                  )}
                </Animated.View>
              ) : (
                <TouchableOpacity
                  style={[
                    styles.submitButton,
                    isNarrowScreen && styles.submitButtonCompact,
                    {
                      backgroundColor:
                        selectedAnswer === null ? "#CCC" : theme.accentColor,
                    },
                  ]}
                  onPress={handleSubmitAnswer}
                  disabled={selectedAnswer === null || isProcessing}
                >
                  <Text style={styles.submitButtonText}>답 정하기! ✨</Text>
                </TouchableOpacity>
              )}
            </ScrollView>

            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBar,
                  {
                    width: `${
                      ((currentQuestionIndex + 1) / totalQuestions) * 100
                    }%`,
                    backgroundColor: theme.accentColor,
                  },
                ]}
              />
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>

      {showFireworks && (
        <Fireworks
          isVisible={showFireworks}
          intensity={fireworksIntensity}
          onAnimationEnd={() => setShowFireworks(false)}
        />
      )}
      {showEncouragingCharacter && (
        <EncouragingCharacter
          isVisible={showEncouragingCharacter}
          onAnimationEnd={() => setShowEncouragingCharacter(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  contentBackground: {
    flex: 1,
    width: "100%",
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  headerBackButton: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#DDD",
    elevation: 6,
  },
  headerBackButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  scoreContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  scoreText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingHorizontal: 24,
  },
  loadingText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#666",
    marginBottom: 16,
    textAlign: "center",
  },
  emptyStateButton: {
    backgroundColor: "#4682B4",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  emptyStateButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 20,
    width: "100%",
  },
  maxWidthWrapper: {
    flex: 1,
    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 6,
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  categorySubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 14,
    textAlign: "center",
  },
  categoryTitleCompact: {
    fontSize: 22,
  },
  categorySubtitleCompact: {
    fontSize: 13,
  },
  questionCard: {
    width: "100%",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    lineHeight: 27,
  },
  questionTextCompact: {
    fontSize: 16,
    lineHeight: 24,
  },
  speakerButton: {
    marginTop: 10,
    backgroundColor: "#F8F8F8",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 50,
  },
  speakerIcon: {
    fontSize: 18,
    fontWeight: "bold",
  },
  speakerIconCompact: {
    fontSize: 16,
  },
  optionsContainer: {
    width: "100%",
    marginBottom: 15,
  },
  optionButton: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#EEE",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  optionButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#444",
    textAlign: "center",
  },
  optionButtonTextCompact: {
    fontSize: 16,
  },
  feedbackOverlay: {
    alignItems: "center",
    padding: 10,
  },
  feedbackText: {
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 5,
    textAlign: "center",
  },
  celebrationEmoji: {
    fontSize: 32,
    marginTop: 5,
  },
  correctFeedback: {
    color: "#2ECC71",
  },
  incorrectFeedback: {
    color: "#E74C3C",
  },
  submitButton: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    width: "100%",
    maxWidth: 320,
    alignItems: "center",
  },
  submitButtonCompact: {
    paddingHorizontal: 24,
  },
  submitButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
    marginHorizontal: 20,
    marginBottom: 10,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: 5,
  },
});

export default QuizScreen;
