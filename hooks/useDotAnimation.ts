import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

const useDotAnimation = (initialDelay: number) => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      animation.setValue(0);
      Animated.loop(
        Animated.sequence([
          Animated.delay(initialDelay),
          Animated.sequence([
            Animated.timing(animation, {
              toValue: -5,
              duration: 300,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(animation, {
              toValue: 0,
              duration: 300,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
          ]),
          // Adjust delay to sync the loop timing
          Animated.delay(400 - initialDelay),
        ])
      ).start();
    };

    animate();

    return () => {
      animation.stopAnimation();
    };
  }, [animation, initialDelay]);

  return animation;
};

export default useDotAnimation;
