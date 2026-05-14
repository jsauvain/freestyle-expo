import { StyleSheet, View, type ViewStyle } from "react-native";
import { useTokens } from "./TokenProvider";

export type DividerProps = {
  vertical?: boolean;
  style?: ViewStyle;
};

export function Divider({ vertical, style }: DividerProps) {
  const t = useTokens();
  return (
    <View
      style={[
        vertical
          ? { width: StyleSheet.hairlineWidth, alignSelf: "stretch" }
          : { height: StyleSheet.hairlineWidth, alignSelf: "stretch" },
        { backgroundColor: t.palette.border },
        style,
      ]}
    />
  );
}
