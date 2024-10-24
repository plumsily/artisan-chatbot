import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { PiSparkle, PiUser, PiPaperPlaneRight } from "react-icons/pi";
import { Message } from "../types";
import ChatMessage from "./ChatMessage";
import Button from "./Button";

interface ChatWindowProps {
  messages: Message[];
  setMessages: Dispatch<SetStateAction<Message[]>>;
}

const ChatWindow = ({ messages, setMessages }: ChatWindowProps) => {
  const [message, setMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLUListElement>(null); // Create a ref for the message list to auto scroll

  const handleMessageSubmit = async (message: string) => {
    if (message.trim() === "") return;

    const newMessage = {
      id: message + Date.now(),
      sender: "user",
      content: message,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
  };

  // Scroll to the bottom when messages array changes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="absolute bottom-4 right-4 rounded-2xl h-[700px] w-[400px] bg-white shadow-xl flex flex-col justify-between">
      {/* Header section with Ava details */}
      <div className="flex flex-col items-center pt-10 pb-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-300 rounded-full mb-2">
          <PiSparkle size={32} color="white" />
        </div>
        <h2 className="font-semibold">Hey👋, I&apos;m Ava</h2>
        <p className="text-gray-500 text-sm">
          Ask me anything or pick a place to start
        </p>
      </div>

      {/* Message list display section */}
      <ul
        className="flex flex-1 flex-col gap-2 overflow-y-scroll text-sm custom-scrollbar pr-2 pl-4"
        ref={messagesEndRef}
      >
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </ul>

      {/* User input textfield section */}
      <div className="flex items-center py-4 border-t border-gray-100 mt-2 mx-4">
        <div className="w-7 h-7 flex items-center justify-center bg-lime-300 rounded-full">
          <PiUser size={16} />
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleMessageSubmit(message);
          }}
          className="flex-1 flex"
        >
          <input
            type="text"
            placeholder="Your question"
            className="flex-1 p-2 focus:outline-none text-sm"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </form>
        <Button handleClick={() => handleMessageSubmit(message)} size={28}>
          <PiPaperPlaneRight size={16} />
        </Button>
      </div>
    </div>
  );
};

export default ChatWindow;
