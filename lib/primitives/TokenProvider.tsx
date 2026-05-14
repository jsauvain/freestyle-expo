import { useFonts } from "expo-font";
import { createContext, useContext, type ReactNode } from "react";
import * as BeVietnamPro from "@expo-google-fonts/be-vietnam-pro";
import * as CrimsonPro from "@expo-google-fonts/crimson-pro";
import * as Fraunces from "@expo-google-fonts/fraunces";
import * as Geist from "@expo-google-fonts/geist";
import * as GeistMono from "@expo-google-fonts/geist-mono";
import * as InstrumentSerif from "@expo-google-fonts/instrument-serif";
import * as Inter from "@expo-google-fonts/inter";
import * as JetBrainsMono from "@expo-google-fonts/jetbrains-mono";
import * as Manrope from "@expo-google-fonts/manrope";
import * as Outfit from "@expo-google-fonts/outfit";
import * as PlusJakartaSans from "@expo-google-fonts/plus-jakarta-sans";
import * as SpaceGrotesk from "@expo-google-fonts/space-grotesk";
import type { DesignTokens } from "@/shared/designTokens";

type FontNamespace = Record<string, unknown>;

const FAMILY_ASSETS: Record<string, FontNamespace> = {
  Inter,
  Geist,
  "Be Vietnam Pro": BeVietnamPro,
  Outfit,
  "Space Grotesk": SpaceGrotesk,
  Manrope,
  "Plus Jakarta Sans": PlusJakartaSans,
  Fraunces,
  "Crimson Pro": CrimsonPro,
  "Instrument Serif": InstrumentSerif,
  "JetBrains Mono": JetBrainsMono,
  "Geist Mono": GeistMono,
};

// Display's WEIGHT_MAP (300/500/700) + RN's default body weight (400) — these are
// the only weights any primitive in lib/primitives/* can ever request. Italics
// aren't exposed by any primitive prop, so they're dropped entirely. Metro does
// NOT tree-shake through `import * as <Family>` namespace imports, so all
// weights are still in the bundle; this filter only reduces what gets registered
// with expo-font's useFonts call at runtime. Real bundle-size wins would require
// named imports per weight per family.
const NEEDED_WEIGHTS = new Set(["300", "400", "500", "700"]);

function extractFontAssets(ns: FontNamespace): Record<string, number> {
  const out: Record<string, number> = {};
  for (const [key, value] of Object.entries(ns)) {
    if (typeof value !== "number") continue;
    const match = /_(\d+)[A-Za-z]+$/.exec(key);
    if (match && NEEDED_WEIGHTS.has(match[1])) out[key] = value;
  }
  return out;
}

const TokenContext = createContext<DesignTokens | null>(null);

export function TokenProvider({
  tokens,
  children,
}: {
  tokens: DesignTokens;
  children: ReactNode;
}) {
  const headingNs = FAMILY_ASSETS[tokens.typography.headingFamily];
  const bodyNs = FAMILY_ASSETS[tokens.typography.bodyFamily];
  const [loaded] = useFonts({
    ...extractFontAssets(headingNs),
    ...extractFontAssets(bodyNs),
  });
  if (!loaded) return null;
  return <TokenContext.Provider value={tokens}>{children}</TokenContext.Provider>;
}

export function useTokens(): DesignTokens {
  const t = useContext(TokenContext);
  if (!t) throw new Error("useTokens must be used inside a <TokenProvider>.");
  return t;
}
