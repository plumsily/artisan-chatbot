"use client";

import {
  PiArrowRight,
  PiUser,
  PiSparkle,
  PiPaperPlaneRight,
} from "react-icons/pi";
import { useState, useEffect, useRef } from "react";

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: number;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");

  const messagesEndRef = useRef<HTMLUListElement>(null); // Create a ref for the ul element

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

      {/* Chat Window */}
      <div className="absolute bottom-4 right-4 rounded-2xl h-[700px] w-[400px] bg-white shadow-xl flex flex-col justify-between">
        <div className="flex flex-col items-center pt-10 pb-6">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-300 rounded-full mb-2">
            <PiSparkle size={32} color="white" />
          </div>
          <h2 className="font-semibold">Hey👋, I&apos;m Ava</h2>
          <p className="text-gray-500 text-sm">
            Ask me anything or pick a place to start
          </p>
        </div>
        <ul
          className="flex flex-col gap-2 overflow-y-scroll text-sm custom-scrollbar pr-2 pl-4"
          ref={messagesEndRef}
        >
          {messages.map((message) => {
            return (
              <li
                className={`flex flex-col w-full ${
                  message.sender === "user" && "items-end"
                }`}
                key={message.id}
              >
                <div
                  className={`flex flex-col py-2 px-4 ${
                    message.sender === "user" &&
                    "items-end bg-purple-500 text-white rounded-l-3xl rounded-br-3xl"
                  }`}
                >
                  <p>{message.content}</p>
                </div>
              </li>
            );
          })}
        </ul>

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
          <button
            onClick={() => handleMessageSubmit(message)}
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-purple-500 hover:text-white transition-all"
          >
            <PiPaperPlaneRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
