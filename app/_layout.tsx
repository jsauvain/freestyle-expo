import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { TokenProvider } from "@/lib/primitives";
import type { DesignTokens } from "@/shared/designTokens";
import tokens from "../tokens.json";

export default function RootLayout() {
  return (
    <TokenProvider tokens={tokens as DesignTokens}>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="auto" />
    </TokenProvider>
  );
}
