import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Image,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import * as Speech from "expo-speech";
import Fireworks from "../components/Fireworks";
import EncouragingCharacter from "../components/EncouragingCharacter";
import { db } from "../config/firebaseConfig"; // Import Firebase db
import allQuizData from "../data/quizData"; // Import all quiz data

const QuizScreen = ({ navigation }) => {
  const route = useRoute();
  const { category } = route.params;

  // For Jung-woo's personalized data
  const userId = "jungwoo_explorer";

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [showFireworks, setShowFireworks] = useState(false);
  const [showEncouragingCharacter, setShowEncouragingCharacter] = useState(false);
  const [quizData, setQuizData] = useState([]); // State to hold filtered quiz data
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0); // Track correct answers for current session

  useEffect(() => {
    // Filter quiz data by category when the component mounts or category changes
    const filteredQuizzes = allQuizData.filter(q => q.category === category);
    // Shuffle the filtered quizzes to present them randomly
    setQuizData(filteredQuizzes.sort(() => Math.random() - 0.5));
  }, [category]);

  const currentQuestion = quizData[currentQuestionIndex];

  const speakQuestion = (text) => {
    Speech.speak(text, {
      language: "ko-KR", // Korean language
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
    if (!db) {
      console.warn("Firebase Firestore is not initialized. Cannot save wrong answer.");
      return;
    }
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
      console.log("Wrong answer saved successfully!");
    } catch (error) {
      console.error("Error saving wrong answer: ", error);
    }
  };

  const updateUserProgress = async (isCorrect) => {
    if (!db) {
      console.warn("Firebase Firestore is not initialized. Cannot update user progress.");
      return;
    }

    const userProgressRef = db.collection("user_progress").doc(userId);

    try {
      await userProgressRef.set(
        {
          totalCorrectAnswers: db.FieldValue.increment(isCorrect ? 1 : 0),
          quizzesCompleted: db.FieldValue.increment(1), // Increment for each question answered
          lastActivity: new Date().toISOString(),
          // Badges will be handled in Task 9, this is a placeholder for now
        },
        { merge: true } // Merge to update existing fields without overwriting
      );
      console.log("User progress updated successfully!");
    } catch (error) {
      console.error("Error updating user progress: ", error);
    }
  };

  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index);
    setFeedbackMessage(null); // Clear previous feedback
  };

  const handleSubmitAnswer = async () => {
    if (selectedAnswer === null) {
      setFeedbackMessage("답을 선택해주세요!");
      return;
    }

    Speech.stop(); // Stop any ongoing speech

    const isCorrect = selectedAnswer === currentQuestion.correctAnswerIndex;

    if (isCorrect) {
      setFeedbackMessage("정답! 박정우 탐험가님, 대단해요!");
      setShowFireworks(true);
      setCorrectAnswersCount(prev => prev + 1); // Increment correct answers for current session
      // TODO: Award badge (Task 9) - This will involve Firebase User_Progress update
    } else {
      setFeedbackMessage("아쉬워요! 다시 생각해볼까요?");
      setShowEncouragingCharacter(true);
      saveWrongAnswer(currentQuestion, currentQuestion.options[selectedAnswer]); // Save wrong answer
    }

    // Update user progress for each question answered
    await updateUserProgress(isCorrect);

    // For now, move to next question after a short delay
    setTimeout(() => {
      setSelectedAnswer(null);
      setFeedbackMessage(null);
      setShowFireworks(false); // Hide fireworks
      setShowEncouragingCharacter(false); // Hide encouraging character
      if (currentQuestionIndex < quizData.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Navigate to ResultScreen
        navigation.replace("Result", {
          totalQuestions: quizData.length,
          correctAnswersCount: correctAnswersCount,
          category: category,
        });
      }
    }, 2000);
  };

  if (!currentQuestion || quizData.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>퀴즈 데이터를 불러오는 중이거나 해당 카테고리에 문제가 없습니다.</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>뒤로 가기</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../assets/images/background.png")}
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.categoryTitle}>{category.toUpperCase()}</Text>
          <View style={styles.questionCard}>
            {currentQuestion.imageUrl && (
              <Image
                source={{ uri: currentQuestion.imageUrl }}
                style={styles.questionImage}
              />
            )}
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
            <TouchableOpacity onPress={() => speakQuestion(currentQuestion.question)} style={styles.speakerButton}>
              {/* Placeholder for speaker icon */}
              <Text style={styles.speakerIcon}>🔊</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedAnswer === index && styles.selectedOptionButton,
                ]}
                onPress={() => handleAnswerSelect(index)}
              >
                <Text style={styles.optionButtonText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {feedbackMessage && (
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
          )}

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmitAnswer}
            disabled={selectedAnswer === null}
          >
            <Text style={styles.submitButtonText}>답변 제출</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {showFireworks && <Fireworks isVisible={showFireworks} onAnimationEnd={() => setShowFireworks(false)} />}
      {showEncouragingCharacter && <EncouragingCharacter isVisible={showEncouragingCharacter} onAnimationEnd={() => setShowEncouragingCharacter(false)} />}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: "#FF6347",
    padding: 10,
    borderRadius: 10,
  },
  backButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  content: {
    alignItems: "center",
    width: "90%",
    padding: 20,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#4682B4",
  },
  questionCard: {
    alignItems: "center",
    marginBottom: 20,
  },
  questionImage: {
    width: 200,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  questionText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  speakerButton: {
    marginTop: 10,
    backgroundColor: "#EEE",
    padding: 10,
    borderRadius: 50,
  },
  speakerIcon: {
    fontSize: 24,
  },
  optionsContainer: {
    width: "100%",
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#DDD",
    alignItems: "center",
  },
  selectedOptionButton: {
    borderColor: "#FF6347",
    borderWidth: 2,
    backgroundColor: "#FFF0F0",
  },
  optionButtonText: {
    fontSize: 16,
    color: "#333",
  },
  feedbackText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  correctFeedback: {
    color: "green",
  },
  incorrectFeedback: {
    color: "red",
  },
  submitButton: {
    backgroundColor: "#32CD32",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  submitButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});

export default QuizScreen;
