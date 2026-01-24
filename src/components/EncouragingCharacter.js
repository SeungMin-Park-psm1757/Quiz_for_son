import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

const EncouragingCharacter = ({ isVisible, onAnimationEnd }) => {
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      bounceAnim.setValue(0); // Reset animation
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(500), // Hold for a moment
      ]).start(() => {
        setShow(false);
        onAnimationEnd && onAnimationEnd();
      });
    }
  }, [isVisible]);

  if (!show) {
    return null;
  }

  const translateY = bounceAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -20, 0], // Bounce effect
  });

  return (
    <View style={styles.container} pointerEvents="none">
      <Animated.View style={[styles.characterWrapper, { transform: [{ translateY }] }]}>
        <Text style={styles.character}>🤔</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  characterWrapper: {
    position: 'absolute',
    bottom: 50, // Position it towards the bottom
  },
  character: {
    fontSize: 80, // Large emoji character
  },
});

export default EncouragingCharacter;
