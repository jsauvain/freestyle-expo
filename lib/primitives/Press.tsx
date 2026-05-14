import { Pressable, type PressableProps } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useTokens } from "./TokenProvider";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export type PressProps = PressableProps;

export function Press({
  onPress,
  children,
  style,
  hitSlop = 8,
  ...rest
}: PressProps) {
  const t = useTokens();
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);
  const opacity = useSharedValue(1);
  const anim = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotate.value}deg` }],
    opacity: opacity.value,
  }));
  const spring = {
    stiffness: t.motion.springStiffness,
    damping: t.motion.springDamping,
  };

  const onPressIn = () => {
    switch (t.motion.vibe) {
      case "snappy":
        scale.value = withSpring(0.97, spring);
        break;
      case "soft":
        opacity.value = withTiming(0.85, { duration: 100 });
        break;
      case "playful":
        scale.value = withSpring(0.94, spring);
        rotate.value = withSpring(2, spring);
        break;
      case "still":
        opacity.value = 0.65;
        break;
    }
  };

  const onPressOut = () => {
    switch (t.motion.vibe) {
      case "snappy":
        scale.value = withSpring(1, spring);
        break;
      case "soft":
        opacity.value = withTiming(1, { duration: 120 });
        break;
      case "playful":
        scale.value = withSpring(1, spring);
        rotate.value = withSpring(0, spring);
        break;
      case "still":
        opacity.value = 1;
        break;
    }
  };

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      hitSlop={hitSlop}
      style={
        typeof style === "function"
          ? (s) => [anim, style(s)]
          : [anim, style]
      }
      {...rest}
    >
      {typeof children === "function" ? children : () => children}
    </AnimatedPressable>
  );
}
