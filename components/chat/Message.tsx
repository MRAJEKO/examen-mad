import { StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";

interface IProps {
  content: string;
  role: string;
}

const Message = ({ role, content }: IProps) => {
  return (
    <View
      style={[
        styles.container,
        role === "user" ? styles.user : styles.assistant,
      ]}
    >
      <ThemedText style={[styles.message]}>{content}</ThemedText>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    paddingHorizontal: 16,
    maxWidth: "80%",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  message: {
    fontSize: 16,
    color: "#fff",
  },
  user: {
    backgroundColor: "#3459fe",
    alignSelf: "flex-end",
    borderBottomLeftRadius: 8,
  },
  assistant: {
    backgroundColor: "#1f1f1f",
    borderBottomRightRadius: 8,
  },
});
