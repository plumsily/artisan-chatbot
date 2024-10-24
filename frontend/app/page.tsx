"use client";

import { PiArrowRight } from "react-icons/pi";
import { useEffect, useState } from "react";
import { Message } from "./types";
import ChatWindow from "./components/ChatWindow";
import axios from "axios";

export const API_URL = "http://localhost:8000"; // backend url

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get<Message[]>(`${API_URL}/messages/`);
        setMessages(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching messages: ", error);
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      {/* Hero Section */}
      <div className="flex flex-col gap-2 items-center">
        <div className="flex space-x-2">
          <div
            className="w-5 h-5 bg-blue-500 rounded-full animate-bounce"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="w-5 h-5 bg-green-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-5 h-5 bg-red-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
        <h1 className="text-3xl font-semibold">Artisan Chatbot</h1>
        <div className="flex items-center gap-2">
          <p>Start chatting with Ava!</p>
          <PiArrowRight size={20} />
        </div>
      </div>

      <ChatWindow
        messages={messages}
        setMessages={setMessages}
        isLoading={isLoading}
      />
    </div>
  );
}
