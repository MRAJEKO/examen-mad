import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Icon from "react-native-remix-icon";

interface IProps extends React.ComponentProps<typeof TextInput> {}

const Input = ({ ...otherProps }: IProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={[
        { borderColor: isFocused ? "#3459fe" : "transparent" },
        styles.container,
      ]}
    >
      <TextInput
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={[styles.input]}
        {...otherProps}
      />
      <View style={[{ opacity: isFocused ? 1 : 0 }, styles.icon]}>
        <Icon name="send-plane-2-fill" size="20" color="white" />
      </View>
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
