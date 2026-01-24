import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

const PARTICLE_COLORS = ['#FFD700', '#FF6347', '#32CD32', '#87CEEB', '#EE82EE']; // Gold, Tomato, LimeGreen, SkyBlue, Violet

const Fireworks = ({ isVisible, onAnimationEnd, intensity = 1 }) => {
  const animations = useRef([]).current; // We will use this array, but we need to populate it dynamically or have a max size
  // Better approach: use a state for animations wrapper or just manage them in the effect

  // To keep it simple and performant: We will create a fresh set of Animated.Values when 'isVisible' becomes true
  // and we know the intensity. 

  // However, hooks must be consistent. 
  // So we will allocate a MAX number of animations (e.g. 50) and only use N of them.
  const MAX_PARTICLES = 50;

  // Initialize ONLY ONCE
  if (animations.length === 0) {
    for (let i = 0; i < MAX_PARTICLES; i++) {
      animations.push({
        x: new Animated.Value(0),
        y: new Animated.Value(0),
        opacity: new Animated.Value(1),
        scale: new Animated.Value(0),
        color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      });
    }
  }

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);

      // Determine how many particles to use based on intensity
      // Intensity 1: 10, 2: 20, 3: 30, 4: 50
      const activeCount = [10, 20, 30, 50][intensity - 1] || 10;

      const activeAnimations = animations.slice(0, activeCount);

      // Reset
      activeAnimations.forEach(anim => {
        anim.x.setValue(0);
        anim.y.setValue(0);
        anim.opacity.setValue(1);
        anim.scale.setValue(0);
        // Randomize color again for variety if desired, but not strictly necessary
      });

      Animated.parallel(
        activeAnimations.map(anim =>
          Animated.sequence([
            Animated.delay(Math.random() * 100),
            Animated.parallel([
              Animated.timing(anim.x, {
                toValue: (Math.random() - 0.5) * (200 + (intensity * 50)), // Wider spread
                duration: 800 + (intensity * 100),
                useNativeDriver: true,
              }),
              Animated.timing(anim.y, {
                toValue: -Math.random() * (200 + (intensity * 50)) - 50, // Higher
                duration: 800 + (intensity * 100),
                useNativeDriver: true,
              }),
              Animated.timing(anim.opacity, {
                toValue: 0,
                duration: 1000 + (intensity * 200),
                delay: 200,
                useNativeDriver: true,
              }),
              Animated.timing(anim.scale, {
                toValue: Math.random() * 1.5 + 0.5 + (intensity * 0.3), // Bigger
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
  }, [isVisible, intensity]);

  if (!show) {
    return null;
  }

  // Only render the active ones? Or all? 
  // Rendering all but checking recycled state is complex.
  // We can just render all MAX_PARTICLES but set opacity 0 for unused? 
  // Or just slice the array in render.

  const activeCount = [10, 20, 30, 50][intensity - 1] || 10;
  const renderAnimations = animations.slice(0, activeCount);

  return (
    <View style={styles.container} pointerEvents="none">
      {renderAnimations.map((anim, index) => (
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
