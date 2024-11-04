import { SafeAreaView, View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  safe?: boolean;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  safe = false,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  if (safe) {
    return (
      <SafeAreaView style={[{ backgroundColor }, style]} {...otherProps} />
    );
  }

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
