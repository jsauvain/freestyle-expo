import { TextInput, type TextInputProps } from "react-native";
import { useTokens } from "./TokenProvider";

export type FieldProps = TextInputProps;

export function Field({ style, ...rest }: FieldProps) {
  const t = useTokens();
  return (
    <TextInput
      placeholderTextColor={t.palette.textMuted}
      style={[
        {
          fontFamily: t.typography.bodyFamily,
          fontSize: 15,
          color: t.palette.text,
          backgroundColor: t.palette.surface,
          borderColor: t.palette.border,
          borderWidth: 1,
          borderRadius: t.radius.base,
          paddingHorizontal: t.spacing.baseUnit * 2,
          paddingVertical: t.spacing.baseUnit * 1.5,
        },
        style,
      ]}
      {...rest}
    />
  );
}
