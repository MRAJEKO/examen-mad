import { useState } from "react";

interface IMessage {
  id?: string;
  role: string;
  content: string;
}

interface IProps {
  api: string;
  body: {
    chatIdentifier: string;
  };
}

export const useChat = ({ api, body }: IProps) => {
  const [messages, setMessages] = useState<IMessage[]>([
    { role: "assistant", content: "Hello! How can I help you today?" },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);

  // Function to fetch data from the API
  const fetchData = async (updatedMessages: IMessage[]) => {
    setIsLoading(true);
    try {
      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Ensure headers are set
        },
        body: JSON.stringify({
          messages: updatedMessages,
          ...body,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
      }

      // Append the response from the API to messages
      else setMessages((prevMessages) => [...prevMessages, data]);
    } catch (error) {
      setError("There was an error fetching the data");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to append a new message and trigger data fetching
  const append = (message: IMessage) => {
    if (!message.content) return;

    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, message];
      // Call fetchData with the updated messages
      fetchData(updatedMessages);
      setError(null);
      return updatedMessages;
    });
  };

  return { messages, isLoading, append, error };
};
