import { View, type ViewProps } from "react-native";
import { useTokens } from "./TokenProvider";

const ALIGN = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  stretch: "stretch",
} as const;

const JUSTIFY = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  between: "space-between",
  around: "space-around",
} as const;

export type StackProps = ViewProps & {
  direction?: "row" | "col";
  gap?: number;
  align?: keyof typeof ALIGN;
  justify?: keyof typeof JUSTIFY;
};

export function Stack({
  direction = "col",
  gap = 0,
  align,
  justify,
  style,
  ...rest
}: StackProps) {
  const t = useTokens();
  return (
    <View
      style={[
        {
          flexDirection: direction === "row" ? "row" : "column",
          gap: gap * t.spacing.baseUnit,
          alignItems: align ? ALIGN[align] : undefined,
          justifyContent: justify ? JUSTIFY[justify] : undefined,
        },
        style,
      ]}
      {...rest}
    />
  );
}
