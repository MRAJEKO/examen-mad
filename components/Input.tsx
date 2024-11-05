import React, { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import Icon from "react-native-remix-icon";

interface IProps extends React.ComponentProps<typeof TextInput> {
  onSubmitEditing: () => void;
  loading?: boolean;
  value: string;
}

const Input = ({ onSubmitEditing, loading, value, ...otherProps }: IProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={[
        { borderColor: isFocused ? "#3459fe" : "#1f1f1f" },
        styles.container,
      ]}
    >
      <TextInput
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={[styles.input]}
        onSubmitEditing={() => !loading && onSubmitEditing()}
        value={value}
        {...otherProps}
      />
      <Pressable
        style={[{ opacity: value ? (loading ? 0.5 : 1) : 0 }, styles.icon]}
        onPress={onSubmitEditing}
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
    padding: 4,
    margin: 8,
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
    padding: 8,
    backgroundColor: "#3459fe",
    borderRadius: 9999,
  },
});