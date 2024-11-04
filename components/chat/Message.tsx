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
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    color: "#fff",
  },
  user: {
    backgroundColor: "#3459fe",
    alignSelf: "flex-end",
    borderBottomLeftRadius: 12,
  },
  assistant: {
    backgroundColor: "#1f1f1f",
    borderBottomRightRadius: 12,
  },
});
