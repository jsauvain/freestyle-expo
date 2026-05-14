import type { ReactNode } from "react";
import { Modal } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
} from "react-native-reanimated";
import { useTokens } from "./TokenProvider";

export type SheetProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export function Sheet({ open, onClose, children }: SheetProps) {
  const t = useTokens();
  if (!open) return null;

  const isStill = t.motion.vibe === "still";

  return (
    <Modal
      transparent
      animationType={isStill ? "slide" : "none"}
      onRequestClose={onClose}
    >
      <Animated.View
        entering={isStill ? undefined : FadeIn.duration(180)}
        exiting={isStill ? undefined : FadeOut.duration(120)}
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.4)",
          justifyContent: "flex-end",
        }}
        onTouchEnd={onClose}
      >
        <Animated.View
          entering={
            isStill
              ? undefined
              : SlideInDown.springify()
                  .stiffness(t.motion.springStiffness)
                  .damping(t.motion.springDamping)
          }
          exiting={isStill ? undefined : SlideOutDown.duration(180)}
          onTouchEnd={(e) => e.stopPropagation()}
          style={{
            backgroundColor: t.palette.surfaceElevated,
            borderTopLeftRadius: t.radius.base * 1.5,
            borderTopRightRadius: t.radius.base * 1.5,
            padding: t.spacing.baseUnit * 3,
          }}
        >
          {children}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}
