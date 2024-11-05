import { IMessage } from "@/hooks/useChat";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import RemixIcon from "react-native-remix-icon";
import Input from "./Input";

interface IProps {
  messages: IMessage[];
  submitBadResponse: (message?: string) => void;
  reset?: () => void;
}

const BadResponse = ({ submitBadResponse, messages }: IProps) => {
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    setIsPressed(false);
    setIsSubmitted(false);
    setInput("");
  }, [messages]);

  if (messages.at(-1)?.role !== "assistant" || messages.length < 2) return null;

  return (
    <View style={styles.container}>
      {isSubmitted ? (
        <Text style={styles.submitted}>Bedankt voor je feedback!</Text>
      ) : (
        <>
          <Pressable
            style={styles.button}
            onPress={() => {
              if (isPressed) return;

              setIsPressed(true);
              submitBadResponse();
            }}
          >
            <View
              style={[
                styles.thumb,
                { backgroundColor: isPressed ? "#DE361855" : "transparent" },
              ]}
            >
              <RemixIcon
                name={isPressed ? "thumb-down-fill" : "thumb-down-line"}
                size={16}
                color={isPressed ? "#DE3618" : "white"}
              />
            </View>
            <Text style={styles.text}>Slecht antwoord</Text>
          </Pressable>
          {isPressed && (
            <Input
              color="#DE3618"
              style={styles.input}
              placeholder="Dit was een slecht antwoord..."
              onSubmit={(text) => {
                setIsSubmitted(true);
                submitBadResponse(text);
              }}
              value={input}
              onChangeText={setInput}
            />
          )}
        </>
      )}
    </View>
  );
};

export default BadResponse;

const styles = StyleSheet.create({
  container: {
    gap: 8,
    marginBottom: 12,
  },
  submitted: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
  },
  thumb: {
    padding: 4,
    borderRadius: 4,
  },
  text: {
    color: "#fff",
    fontSize: 12,
    marginLeft: 8,
  },
  input: {
    borderRadius: 8,
  },
});
