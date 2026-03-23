import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { getQuizFallbackCopy, resolveQuizImageUri } from "../utils/quizImages";

const QuestionVisual = ({ question, category, theme, height }) => {
  const [loadFailed, setLoadFailed] = useState(false);
  const imageUri = resolveQuizImageUri(question);
  const fallback = getQuizFallbackCopy(category);

  useEffect(() => {
    setLoadFailed(false);
  }, [question?.id]);

  if (!imageUri || loadFailed) {
    return (
      <View
        style={[
          styles.fallbackCard,
          {
            height,
            backgroundColor: theme.backgroundColor,
            borderColor: theme.accentColor,
          },
        ]}
      >
        <View
          style={[
            styles.bubbleLarge,
            { backgroundColor: `${theme.accentColor}33` },
          ]}
        />
        <View
          style={[
            styles.bubbleSmall,
            { backgroundColor: `${theme.accentColor}22` },
          ]}
        />
        <Text style={styles.fallbackLabel}>QUIZ HINT</Text>
        <Text style={styles.fallbackEmoji}>{fallback.emoji}</Text>
        <Text style={styles.fallbackTitle}>{fallback.title}</Text>
        <Text style={styles.fallbackSubtitle}>{fallback.subtitle}</Text>
      </View>
    );
  }

  return (
    <Image
      source={{ uri: imageUri }}
      style={[styles.image, { height }]}
      onError={() => setLoadFailed(true)}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    borderRadius: 15,
    marginBottom: 10,
    resizeMode: "contain",
    backgroundColor: "#FFF",
  },
  fallbackCard: {
    width: "100%",
    borderRadius: 15,
    marginBottom: 10,
    overflow: "hidden",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    position: "relative",
  },
  bubbleLarge: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    top: -28,
    right: -18,
  },
  bubbleSmall: {
    position: "absolute",
    width: 96,
    height: 96,
    borderRadius: 48,
    bottom: -20,
    left: -18,
  },
  fallbackLabel: {
    fontSize: 12,
    fontWeight: "800",
    color: "#666",
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  fallbackEmoji: {
    fontSize: 54,
    marginBottom: 10,
  },
  fallbackTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#222",
    textAlign: "center",
    marginBottom: 8,
  },
  fallbackSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: "#555",
    textAlign: "center",
  },
});

export default QuestionVisual;
