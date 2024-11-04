import Header from "@/components/chat/Header";
import Input from "@/components/chat/Input";
import Loading from "@/components/chat/Loading";
import Message from "@/components/chat/Message";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useChat } from "@/hooks/useChat";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";

export const getChatIdentifier = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

export default function Index() {
  const { messages, isLoading, error, append } = useChat({
    api: "https://eloquent-website-git-disable-streaming-option-savvycodes.vercel.app/api/chat?domain-identifier=1WgXZrJgsUOnUi8w&streaming=false",
    body: {
      chatIdentifier: getChatIdentifier(),
    },
  });

  const [input, setInput] = useState<string>("");

  const submit = () => {
    append({ role: "user", content: input });
    setInput("");
  };

  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#3459fe" }} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.wrapper}
      >
        <ThemedView safe style={styles.container}>
          <Header />
          <ScrollView style={styles.messages}>
            {messages.map((message, index) => (
              <Message
                key={index}
                role={message.role}
                content={message.content}
              />
            ))}
            {isLoading && <Loading />}
            {error && (
              <ThemedText style={styles.error}>{`Error: ${error}`}</ThemedText>
            )}
          </ScrollView>
          <Input
            value={input}
            onChangeText={(text) => setInput(text)}
            placeholder="Geef antwoord..."
            onSubmitEditing={submit}
          />
        </ThemedView>
      </KeyboardAvoidingView>
    </>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#000",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "space-between",
    flexDirection: "column",
    width: "100%",
  },
  messages: {
    backgroundColor: "#151718",
    flex: 1,
    padding: 12,
    flexDirection: "column",
  },
  error: {
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#DE361855",
    color: "#DE3618",
  },
});
