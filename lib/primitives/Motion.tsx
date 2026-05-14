import type { ReactNode } from "react";
import { type ViewProps } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideInUp,
} from "react-native-reanimated";
import { useTokens } from "./TokenProvider";

export type MotionProps = ViewProps & {
  enter?: "fade" | "slide-up" | "slide-down" | "none";
  delay?: number;
  children?: ReactNode;
};

export function Motion({
  enter = "fade",
  delay = 0,
  children,
  style,
  ...rest
}: MotionProps) {
  const t = useTokens();
  const stiffness = t.motion.springStiffness;
  const damping = t.motion.springDamping;
  const entering =
    enter === "fade"
      ? FadeIn.duration(220).delay(delay)
      : enter === "slide-up"
      ? SlideInUp.springify().stiffness(stiffness).damping(damping).delay(delay)
      : enter === "slide-down"
      ? SlideInDown.springify().stiffness(stiffness).damping(damping).delay(delay)
      : undefined;
  return (
    <Animated.View
      entering={entering}
      exiting={FadeOut.duration(120)}
      style={style}
      {...rest}
    >
      {children}
    </Animated.View>
  );
}
