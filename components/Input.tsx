import React, { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import Icon from "react-native-remix-icon";

interface IProps extends React.ComponentProps<typeof TextInput> {
  onSubmit: (text: string) => void;
  loading?: boolean;
  value: string;
  color?: string;
}

const Input = ({
  onSubmit,
  loading,
  value,
  style,
  color,
  ...otherProps
}: IProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={[
        { borderColor: isFocused ? color || "#3459fe" : "#1f1f1f" },
        styles.container,
        style,
      ]}
    >
      <TextInput
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={[styles.input]}
        onSubmitEditing={() => !loading && onSubmit(value)}
        value={value}
        {...otherProps}
      />
      <Pressable
        style={[
          {
            opacity: value ? (loading ? 0.5 : 1) : 0,
            backgroundColor: color || "#3459fe",
          },
          styles.icon,
        ]}
        onPress={() => onSubmit(value)}
        disabled={loading}
      >
        <Icon name="send-plane-2-fill" size="20" color="white" />
      </Pressable>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    borderRadius: 9999,
    borderWidth: 1,
    gap: 4,
    flexDirection: "row",
    paddingLeft: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#fff",
  },
  icon: {
    margin: 4,
    padding: 8,
    borderRadius: 9999,
  },
});
