import type { ReactNode } from "react";
import { type ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTokens } from "./TokenProvider";

export type SurfaceProps = ViewProps & {
  padded?: boolean;
  children?: ReactNode;
};

export function Surface({ children, padded, style, ...rest }: SurfaceProps) {
  const t = useTokens();
  return (
    <SafeAreaView
      style={[
        { flex: 1, backgroundColor: t.palette.background },
        padded ? { padding: t.spacing.baseUnit * 2 } : null,
        style,
      ]}
      {...rest}
    >
      {children}
    </SafeAreaView>
  );
}
