import { z } from "zod/v3";

export const FONT_WHITELIST = [
  // Humanist
  "Inter", "Geist", "Be Vietnam Pro",
  // Geometric
  "Outfit", "Space Grotesk", "Manrope", "Plus Jakarta Sans",
  // Serif
  "Fraunces", "Crimson Pro", "Instrument Serif",
  // Technical
  "JetBrains Mono", "Geist Mono",
] as const;

export const DesignTokensSchema = z.object({
  palette: z.object({
    mode: z.enum(["light", "dark"]),
    background: z.string(),
    surface: z.string(),
    surfaceElevated: z.string(),
    text: z.string(),
    textMuted: z.string(),
    primary: z.string(),
    accent: z.string(),
    border: z.string(),
    semantic: z.object({
      success: z.string(),
      warn: z.string(),
      error: z.string(),
    }),
  }),
  typography: z.object({
    headingFamily: z.enum(FONT_WHITELIST),
    bodyFamily: z.enum(FONT_WHITELIST),
    character: z.enum(["geometric", "humanist", "serif", "editorial-mix", "technical"]),
    scaleRatio: z.number().min(1.1).max(1.4),
    weightContrast: z.enum(["subtle", "moderate", "strong"]),
  }),
  spacing: z.object({
    baseUnit: z.union([z.literal(4), z.literal(8)]),
    density: z.enum(["airy", "comfortable", "dense"]),
  }),
  radius: z.object({
    character: z.enum(["sharp", "soft", "pill"]),
    base: z.number(),
  }),
  surfaces: z.object({
    treatment: z.enum(["flat", "subtle-shadow", "glassmorphic", "textured", "grainy"]),
  }),
  motion: z.object({
    vibe: z.enum(["snappy", "soft", "playful", "still"]),
    springStiffness: z.number(),
    springDamping: z.number(),
  }),
  layout: z.object({
    grammar: z.enum(["feed", "dashboard", "canvas", "carded", "list-dense", "grid-loose"]),
    navStyle: z.enum(["bottom-tabs", "top-tabs", "drawer", "stack-only", "custom-floating"]),
  }),
  iconography: z.object({
    style: z.enum(["line", "fill", "duotone", "rounded", "geometric"]),
    weight: z.enum(["thin", "regular", "bold"]),
  }),
  vibe: z.object({
    descriptors: z.array(z.string()).min(2).max(4),
    referenceApps: z.array(z.string()).max(3),
  }),
});

export type DesignTokens = z.infer<typeof DesignTokensSchema>;
