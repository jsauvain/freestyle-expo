import * as Lucide from "lucide-react-native";
import type { ComponentType } from "react";
import { useTokens } from "./TokenProvider";

export type IconName = keyof typeof Lucide;

const STROKE = { thin: 1.25, regular: 2, bold: 2.75 } as const;

export type IconProps = {
  name: IconName;
  size?: number;
  color?: string;
};

export function Icon({ name, size = 20, color }: IconProps) {
  const t = useTokens();
  const Comp = Lucide[name] as ComponentType<{
    size?: number;
    color?: string;
    strokeWidth?: number;
  }>;
  return (
    <Comp
      size={size}
      color={color ?? t.palette.text}
      strokeWidth={STROKE[t.iconography.weight]}
    />
  );
}
