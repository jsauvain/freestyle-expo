import { Text as RNText, type TextProps as RNTextProps } from "react-native";
import { useTokens } from "./TokenProvider";

const WEIGHT_MAP = { thin: "300", regular: "500", bold: "700" } as const;

export type DisplayProps = RNTextProps & {
  level?: 1 | 2 | 3;
  weight?: keyof typeof WEIGHT_MAP;
};

export function Display({
  level = 1,
  weight = "regular",
  children,
  style,
  ...rest
}: DisplayProps) {
  const t = useTokens();
  const baseSize = 16 * Math.pow(t.typography.scaleRatio, 5 - level);
  return (
    <RNText
      style={[
        {
          fontFamily: t.typography.headingFamily,
          fontSize: baseSize,
          fontWeight: WEIGHT_MAP[weight],
          color: t.palette.text,
          letterSpacing: t.typography.character === "geometric" ? -0.3 : -0.1,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </RNText>
  );
}

export type BodyProps = RNTextProps & { muted?: boolean };

export function Body({ muted, children, style, ...rest }: BodyProps) {
  const t = useTokens();
  return (
    <RNText
      style={[
        {
          fontFamily: t.typography.bodyFamily,
          fontSize: 15,
          color: muted ? t.palette.textMuted : t.palette.text,
          lineHeight: 22,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </RNText>
  );
}

export type CaptionProps = RNTextProps;

export function Caption({ children, style, ...rest }: CaptionProps) {
  const t = useTokens();
  return (
    <RNText
      style={[
        {
          fontFamily: t.typography.bodyFamily,
          fontSize: 12,
          color: t.palette.textMuted,
          letterSpacing: 0.2,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </RNText>
  );
}
