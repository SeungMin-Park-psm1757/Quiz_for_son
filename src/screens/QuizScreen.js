import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Image,
  Alert,
  Animated,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import * as Speech from "expo-speech";
import Fireworks from "../components/Fireworks";
import EncouragingCharacter from "../components/EncouragingCharacter";
import { db } from "../config/firebaseConfig"; // Import Firebase db
import allQuizData from "../data/quizData"; // Import all quiz data
import backgroundImage from "../../assets/images/background.png";
import { saveQuizHistory } from "../services/historyService";

const QuizScreen = ({ navigation }) => {
  const route = useRoute();
  const { category, userId: paramUserId } = route.params;

  // Use passed userId or fallback
  const userId = paramUserId || "jungwoo_explorer";
  const TOTAL_QUESTIONS = 10; // Standardize to 10 questions per session

  // Category-specific themes
  const categoryThemes = {
    animals: { backgroundColor: "#FFF9E6", accentColor: "#FFD700" },
    science: { backgroundColor: "#E6FFEA", accentColor: "#32CD32" },
    fairyTale: { backgroundColor: "#E6F7FF", accentColor: "#87CEEB" },
    fish_marine: { backgroundColor: "#E6F2FF", accentColor: "#4682B4" },
    dinosaurs: { backgroundColor: "#E9F5E9", accentColor: "#228B22" },
    insects: { backgroundColor: "#F3E5F5", accentColor: "#BA55D3" },
  };

  const theme = categoryThemes[category] || { backgroundColor: "#FFFFFF", accentColor: "#FF6347" };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [showFireworks, setShowFireworks] = useState(false);
  const [fireworksIntensity, setFireworksIntensity] = useState(1);
  const [showEncouragingCharacter, setShowEncouragingCharacter] = useState(false);
  const [quizData, setQuizData] = useState([]); // State to hold filtered quiz data
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [showResultImage, setShowResultImage] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false); // Lock to prevent multiple submissions

  const shimmyAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const filteredQuizzes = allQuizData.filter(q => q.category === category);
    // Grab only 10 random questions
    const shuffled = filteredQuizzes.sort(() => Math.random() - 0.5).slice(0, TOTAL_QUESTIONS);
    setQuizData(shuffled);
  }, [category]);

  const currentQuestion = quizData[currentQuestionIndex];

  const speakQuestion = (text) => {
    Speech.speak(text, {
      language: "ko-KR",
      pitch: 1.2,
      rate: 0.9,
    });
  };

  useEffect(() => {
    if (currentQuestion) {
      speakQuestion(currentQuestion.question);
    }
  }, [currentQuestionIndex, currentQuestion]);

  const saveWrongAnswer = async (quizItem, selectedOption) => {
    if (!db) return;
    try {
      await db.collection("wrong_answers").add({
        userId: userId,
        quizId: quizItem.id,
        category: quizItem.category,
        question: quizItem.question,
        selectedAnswer: selectedOption,
        correctAnswer: quizItem.options[quizItem.correctAnswerIndex],
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error saving wrong answer: ", error);
    }
  };

  const updateUserProgress = async (isCorrect) => {
    if (!db) return;
    const userProgressRef = db.collection("user_progress").doc(userId);
    try {
      await userProgressRef.set(
        {
          totalCorrectAnswers: db.FieldValue.increment(isCorrect ? 1 : 0),
          quizzesCompleted: db.FieldValue.increment(1),
          lastActivity: new Date().toISOString(),
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Error updating user progress: ", error);
    }
  };

  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index);
    setFeedbackMessage(null);
  };

  const handleSubmitAnswer = async () => {
    if (selectedAnswer === null || isProcessing) return;
    setIsProcessing(true); // Lock interactions

    Speech.stop();
    const isCorrect = selectedAnswer === currentQuestion.correctAnswerIndex;

    setQuestionsAnswered(prev => prev + 1);

    if (isCorrect) {
      const newCorrectCount = correctAnswersCount + 1;
      setCorrectAnswersCount(prev => prev + 1);

      // Dynamic Message
      let message = "정답! 박정우 탐험가님, 최고예요! 🎉✨";
      if (newCorrectCount >= 10) message = "우와!! 10문제 모두 정답! 전설의 탐험가 탄생! 👑🌟🚀";
      else if (newCorrectCount >= 8) message = "대단해요! 거의 다 맞췄어요! 🌟🔥";
      else if (newCorrectCount >= 5) message = "멋져요! 절반이나 넘게 맞췄어요! 👍💎";

      setFeedbackMessage(message);

      // Determine Intensity
      let intensity = 1;
      if (newCorrectCount >= 10) intensity = 4;
      else if (newCorrectCount >= 8) intensity = 3;
      else if (newCorrectCount >= 5) intensity = 2;
      else if (newCorrectCount >= 3) intensity = 1.5; // Slight boost

      setFireworksIntensity(intensity);
      setShowFireworks(true);
      setShowResultImage(true);

      // Shimmy Animation
      Animated.sequence([
        Animated.timing(shimmyAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shimmyAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shimmyAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shimmyAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shimmyAnim, { toValue: 0, duration: 50, useNativeDriver: true })
      ]).start();

    } else {
      setFeedbackMessage("아쉬워요! 다시 한 번 생각해볼까요? 🤗");
      setShowEncouragingCharacter(true);
      saveWrongAnswer(currentQuestion, currentQuestion.options[selectedAnswer]);
    }

    await updateUserProgress(isCorrect);

    setTimeout(async () => {
      setSelectedAnswer(null);
      setFeedbackMessage(null);
      setShowFireworks(false);
      setShowEncouragingCharacter(false);
      setShowResultImage(false);

      if (currentQuestionIndex < quizData.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Save history before navigating
        await saveQuizHistory(userId, category, correctAnswersCount + (isCorrect ? 1 : 0), quizData.length);

        navigation.replace("Result", {
          totalQuestions: quizData.length,
          correctAnswersCount: correctAnswersCount + (isCorrect ? 1 : 0),
          category: category,
        });
      }
      setIsProcessing(false); // Unlock interactions
    }, 1500); // Reduced delay for faster flow
  };

  const handleQuit = () => {
    // Fire and forget history save to prevent blocking navigation
    saveQuizHistory(
      userId,
      category,
      correctAnswersCount,
      questionsAnswered,
      'cancelled'
    ).catch(err => console.error("History save failed:", err));

    // Navigate immediately
    navigation.navigate("CategorySelect", { userId });
  };

  if (!currentQuestion || quizData.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>퀴즈를 준비 중이에요... 🏕️</Text>
      </View>
    );
  }

  return (
    <View style={[styles.mainContainer, { backgroundColor: theme.backgroundColor }]}>
      <ImageBackground
        source={backgroundImage}
        style={styles.contentBackground}
        imageStyle={{ opacity: 0.15 }}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.maxWidthWrapper}>
            {/* Top Header with Score and Back */}
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
                  {Math.round(((currentQuestionIndex + 1) / TOTAL_QUESTIONS) * 100)}% | 정답: {correctAnswersCount}
                </Text>
              </View>
            </View>

            <View style={styles.content}>
              <Text style={[styles.categoryTitle, { color: theme.accentColor }]}>
                {category === "fish_marine" ? "물고기 친구들" :
                  category === "animals" ? "동물 친구들" :
                    category === "dinosaurs" ? "공룡의 세계" :
                      category === "insects" ? "꿈틀꿈틀 곤충" : category.toUpperCase()}
              </Text>

              {/* Question Image (Only if part of question and NOT showing result image yet to avoid clutter? Or keep it?) */}
              {/* Keeping question image as is */}
              <View style={styles.questionCard}>
                {/* 
                   If the question has an image, we show it. 
                   If the USER wants a result image separately, we can show it below. 
                   For now, reusing imageUrl if present. 
                */}
                {currentQuestion.imageUrl && (
                  <Image source={{ uri: currentQuestion.imageUrl }} style={styles.questionImage} />
                )}
                <Text style={styles.questionText}>{currentQuestion.question}</Text>
                <TouchableOpacity onPress={() => speakQuestion(currentQuestion.question)} style={styles.speakerButton}>
                  <Text style={styles.speakerIcon}>🔊</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.optionsContainer}>
                {currentQuestion.options.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.optionButton,
                      selectedAnswer === index && { borderColor: theme.accentColor, borderWidth: 3, backgroundColor: "#FFF" },
                    ]}
                    onPress={() => handleAnswerSelect(index)}
                  >
                    <Text style={styles.optionButtonText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {feedbackMessage && (
                <Animated.View style={[styles.feedbackOverlay, { transform: [{ translateX: shimmyAnim }] }]}>
                  <Text style={[
                    styles.feedbackText,
                    selectedAnswer === currentQuestion.correctAnswerIndex ? styles.correctFeedback : styles.incorrectFeedback
                  ]}>
                    {feedbackMessage}
                  </Text>
                  {selectedAnswer === currentQuestion.correctAnswerIndex && (
                    <Text style={styles.celebrationEmoji}>🏆🌟👑</Text>
                  )}
                </Animated.View>
              )}

              {!feedbackMessage && (
                <TouchableOpacity
                  style={[styles.submitButton, { backgroundColor: selectedAnswer === null ? "#CCC" : theme.accentColor }]}
                  onPress={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                >
                  <Text style={styles.submitButtonText}>답 정하기! ✨</Text>
                </TouchableOpacity>
              )}
            </View>
            {/* Progress Bar */}
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${((currentQuestionIndex + 1) / TOTAL_QUESTIONS) * 100}%` }]} />
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
      {showFireworks && <Fireworks isVisible={showFireworks} intensity={fireworksIntensity} onAnimationEnd={() => setShowFireworks(false)} />}
      {showEncouragingCharacter && <EncouragingCharacter isVisible={showEncouragingCharacter} onAnimationEnd={() => setShowEncouragingCharacter(false)} />}
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
    zIndex: 10,
  },
  headerBackButton: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#DDD",
    zIndex: 50, // Increase zIndex to ensure clickability
    elevation: 10,
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
  },
  loadingText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#666",
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 20,
    width: '100%',
  },
  maxWidthWrapper: {
    flex: 1,
    width: '100%',
    maxWidth: 600, // Limit width on large screens
    alignSelf: 'center',
  },
  resultImageContainer: {
    marginTop: 20,
    padding: 5,
    backgroundColor: '#FFF',
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  resultImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 15,
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
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
  questionImage: {
    width: "100%",
    height: 195, // Increased from 150 (1.3x)
    borderRadius: 15,
    marginBottom: 10,
    resizeMode: "contain",
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    lineHeight: 26,
  },
  speakerButton: {
    marginTop: 10,
    backgroundColor: "#F8F8F8",
    padding: 10,
    borderRadius: 50,
  },
  speakerIcon: {
    fontSize: 24,
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
    width: "80%",
    alignItems: "center",
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
    backgroundColor: "#FF6347",
    borderRadius: 5,
  },
});

export default QuizScreen;
