import React, { useEffect } from 'react';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  runOnJS,
  Easing
} from 'react-native-reanimated';

interface AnimatedSplashScreenProps {
  onAnimationComplete: () => void;
}

const SPLASH_BACKGROUND_HEX = '#C9D6FF';

export default function AnimatedSplashScreen({ onAnimationComplete }: AnimatedSplashScreenProps) {
  const logoScale = useSharedValue(0.5);
  const logoOpacity = useSharedValue(0);
  const containerOpacity = useSharedValue(1);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
    opacity: logoOpacity.value,
  }));

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
  }));

  useEffect(() => {
    logoScale.value = withTiming(1, {
      duration: 1000,
      easing: Easing.out(Easing.cubic),
    });
    logoOpacity.value = withTiming(1, { duration: 600 });

    const timeout = setTimeout(() => {
      containerOpacity.value = withTiming(0, { 
        duration: 800,
        easing: Easing.inOut(Easing.quad),
      }, (finished) => {
        if (finished) {
          runOnJS(onAnimationComplete)();
        }
      });
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Animated.View 
      style={containerAnimatedStyle}
      className="absolute inset-0 z-[9999] flex-1 items-center justify-center bg-[#C9D6FF]"
      pointerEvents="none"
    >
      <Animated.Image
        source={require('../assets/images/logo.png')}
        style={[logoAnimatedStyle]}
        className="h-[200px] w-[200px] overflow-hidden rounded-full bg-white"
        resizeMode="contain"
      />
    </Animated.View>
  );
}
