import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

const NUM_PARTICLES = 10; // Number of particles in a single burst
const PARTICLE_COLORS = ['#FFD700', '#FF6347', '#32CD32', '#87CEEB', '#EE82EE']; // Gold, Tomato, LimeGreen, SkyBlue, Violet

const Fireworks = ({ isVisible, onAnimationEnd }) => {
  const animations = useRef([]).current;
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      // Reset and start animations
      animations.forEach(anim => {
        anim.x.setValue(0);
        anim.y.setValue(0);
        anim.opacity.setValue(1);
        anim.scale.setValue(0);
      });

      Animated.parallel(
        animations.map(anim =>
          Animated.sequence([
            Animated.delay(Math.random() * 100), // Stagger start slightly
            Animated.parallel([
              Animated.timing(anim.x, {
                toValue: (Math.random() - 0.5) * 200, // Random horizontal spread
                duration: 800,
                useNativeDriver: true,
              }),
              Animated.timing(anim.y, {
                toValue: -Math.random() * 200 - 50, // Random upward spread
                duration: 800,
                useNativeDriver: true,
              }),
              Animated.timing(anim.opacity, {
                toValue: 0,
                duration: 1000,
                delay: 200,
                useNativeDriver: true,
              }),
              Animated.timing(anim.scale, {
                toValue: Math.random() * 1.5 + 0.5, // Random scale increase
                duration: 800,
                useNativeDriver: true,
              }),
            ]),
          ])
        )
      ).start(() => {
        setShow(false);
        onAnimationEnd && onAnimationEnd();
      });
    }
  }, [isVisible]);

  // Initialize animations once
  useEffect(() => {
    for (let i = 0; i < NUM_PARTICLES; i++) {
      animations.push({
        x: new Animated.Value(0),
        y: new Animated.Value(0),
        opacity: new Animated.Value(1),
        scale: new Animated.Value(0),
        color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      });
    }
  }, []);

  if (!show) {
    return null;
  }

  return (
    <View style={styles.container} pointerEvents="none">
      {animations.map((anim, index) => (
        <Animated.View
          key={index}
          style={[
            styles.particle,
            { backgroundColor: anim.color },
            {
              transform: [
                { translateX: anim.x },
                { translateY: anim.y },
                { scale: anim.scale },
              ],
              opacity: anim.opacity,
            },
          ]}
        />
      ))}
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
  particle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    position: 'absolute',
  },
});

export default Fireworks;
