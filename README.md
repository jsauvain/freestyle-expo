# bloom-expo-template

A pre-scaffolded [Expo Router](https://docs.expo.dev/router/introduction) project with Bloom's themed primitive library, token-driven design system, and curated typography whitelist.

The Bloom codegen agent provisions sandboxes from this template. It composes the `lib/primitives/` library — never raw React Native primitives — and reads the current design tokens from the `<TokenProvider>` injected at the root.

## Contracts

- `lib/primitives/index.tsx` — exported primitives the agent uses (`TokenProvider`, `useTokens`, `Surface`, `Stack`, `Display`, `Body`, `Caption`, `Press`, `Sheet`, `Field`, `Icon`, `Motion`, `Pill`, `Divider`).
- `shared/designTokens.ts` — `DesignTokens` type + zod schema + `FONT_WHITELIST` constant.
- `shared/defaultTokens.ts` — `BLOOM_DEFAULT_TOKENS` (the Bloom house default — muted dark editorial-studio palette).
- `tokens.json` — current token bundle. Rewritten by the Bloom server via MCP `fs/write` before each generation; checked-in copy starts at `BLOOM_DEFAULT_TOKENS`.

## Adding a primitive

1. Define it in `lib/primitives/<Name>.tsx`.
2. Read tokens via `useTokens()` from `./TokenProvider` — never hardcode hex, never `StyleSheet.create` with literal colors.
3. Re-export from `lib/primitives/index.tsx`.
4. Update the codegen system prompt to mention it.

## Adding a font

1. Install the package: `npx expo install @expo-google-fonts/<family>`.
2. Register it in `lib/primitives/TokenProvider.tsx`'s `FAMILY_ASSETS` map (key = human-readable family name, value = the namespace imported via `import * as <Family>`).
3. Add the human-readable name to `FONT_WHITELIST` in `shared/designTokens.ts` so the schema's enum accepts `tokens.typography.headingFamily` / `bodyFamily` referencing it.

## Local dev

```bash
npm install
npx expo start --web    # the preview Freestyle serves
```

The dev server boots with `<TokenProvider tokens={tokens.json}>` already wrapping the route stack, so the stock `app/index.tsx` screen renders against the current tokens — change `tokens.json` and the next reload re-skins everything.
