import { createContext, useContext, type ReactNode } from "react";
import type { DesignTokens } from "@/shared/designTokens";

const TokenContext = createContext<DesignTokens | null>(null);

export function TokenProvider({
  tokens,
  children,
}: {
  tokens: DesignTokens;
  children: ReactNode;
}) {
  return <TokenContext.Provider value={tokens}>{children}</TokenContext.Provider>;
}

export function useTokens(): DesignTokens {
  const t = useContext(TokenContext);
  if (!t) throw new Error("useTokens must be used inside a <TokenProvider>.");
  return t;
}
