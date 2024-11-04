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
    {
      role: "assistant",
      content:
        "Hallo ik ben Elo! Vertel me hoe jij AI wilt toepassen en ik help je graag met het vinden van de juiste implementatie!",
    },
  ]);
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
          ...body,
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

  return { messages, isLoading, append, error };
};
