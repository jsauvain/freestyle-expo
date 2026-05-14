import type { ReactNode } from "react";
import { Text, View } from "react-native";
import { useTokens } from "./TokenProvider";

export type PillProps = {
  children: ReactNode;
  tone?: "neutral" | "accent" | "primary";
};

export function Pill({ children, tone = "neutral" }: PillProps) {
  const t = useTokens();
  const bg =
    tone === "accent"
      ? t.palette.accent
      : tone === "primary"
      ? t.palette.primary
      : t.palette.surface;
  const color = tone === "neutral" ? t.palette.textMuted : t.palette.background;
  return (
    <View
      style={{
        paddingHorizontal: t.spacing.baseUnit * 1.5,
        paddingVertical: t.spacing.baseUnit * 0.5,
        backgroundColor: bg,
        borderRadius: 999,
        alignSelf: "flex-start",
      }}
    >
      <Text
        style={{
          fontFamily: t.typography.bodyFamily,
          fontSize: 12,
          color,
          letterSpacing: 0.3,
        }}
      >
        {children}
      </Text>
    </View>
  );
}
