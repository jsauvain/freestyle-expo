import { Body, Display, Stack, Surface } from "@/lib/primitives";

export default function Home() {
  return (
    <Surface padded>
      <Stack gap={2} align="center" justify="center" style={{ flex: 1 }}>
        <Display level={1}>Bloom</Display>
        <Body muted>Awaiting first prompt.</Body>
      </Stack>
    </Surface>
  );
}
