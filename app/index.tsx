import Header from "@/components/Header";
import Input from "@/components/Input";
import Loading from "@/components/Loading";
import Message from "@/components/Message";
import { useChat } from "@/hooks/useChat";
import React, { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
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

  const scrollViewRef = useRef<ScrollView>(null);

  const submit = () => {
    append({ role: "user", content: input });
    setInput("");
  };

  const scrollToBottom = () =>
    scrollViewRef.current?.scrollToEnd({ animated: true });

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardWillShow",
      scrollToBottom
    );
    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#3459fe" }} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.wrapper}
      >
        <SafeAreaView style={styles.container}>
          <Header />
          <ScrollView
            style={styles.messages}
            contentContainerStyle={{ paddingHorizontal: 12, paddingTop: 12 }}
            ref={scrollViewRef}
            onContentSizeChange={scrollToBottom}
          >
            {messages.map((message, index) => (
              <Message
                key={index}
                role={message.role}
                content={message.content}
              />
            ))}
            {isLoading && <Loading />}
            {error && <Text style={styles.error}>{`Error: ${error}`}</Text>}
          </ScrollView>
          <Input
            loading={isLoading}
            value={input}
            onChangeText={(text) => setInput(text)}
            placeholder="Geef antwoord..."
            onSubmitEditing={submit}
          />
        </SafeAreaView>
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
