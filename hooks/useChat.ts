import { REVIEW_URL } from "@/contants/url";
import { useState } from "react";

export interface IMessage {
  id?: string;
  role: string;
  content: string;
}

interface IProps {
  api: string;
}

const startMessage: IMessage = {
  role: "assistant",
  content:
    "Hallo ik ben Elo! Vertel me hoe jij AI wilt toepassen en ik help je graag met het vinden van de juiste implementatie!",
};

export const getChatIdentifier = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

export const useChat = ({ api }: IProps) => {
  const [chatIdentifier, setChatIdentifier] = useState<string>(
    getChatIdentifier()
  );

  const [messages, setMessages] = useState<IMessage[]>([startMessage]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);

  const fetchData = async (updatedMessages: IMessage[]) => {
    setIsLoading(true);
    try {
      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages,
          chatIdentifier,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
      } else setMessages((prevMessages) => [...prevMessages, data]);
    } catch (error) {
      setError("There was an error fetching the data");
    } finally {
      setIsLoading(false);
    }
  };

  const append = (message: IMessage) => {
    if (!message.content) return;

    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, message];
      fetchData(updatedMessages);
      setError(null);
      return updatedMessages;
    });
  };

  const newChat = () => {
    setMessages([startMessage]);
    setChatIdentifier(getChatIdentifier());
  };

  const submitBadResponse = async (message?: string) => {
    try {
      await fetch(REVIEW_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "BAD",
          message: message,
          chatIdentifier,
        }),
      });
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return { messages, isLoading, append, error, newChat, submitBadResponse };
};
