"use client";
import { useEffect, useRef, useState } from "react";
import {
  PiSparkle,
  PiUser,
  PiPaperPlaneRight,
  PiMinus,
  PiPlus,
  PiArrowsOutSimple,
} from "react-icons/pi";
import { Message } from "../types";
import ChatMessage from "./ChatMessage";
import Button from "./Button";
import axios from "axios";
import { API_URL } from "../page";

interface MessageCreate {
  user_message: Message;
  agent_message: Message;
}

const ChatWindow = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLUListElement>(null); // Create a ref for the message list to auto scroll

  // Fetch all messages on load
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

  // API Handlers
  const handleMessageSubmit = async (message: string) => {
    if (message.trim() === "") return;

    const newMessage = {
      content: message,
    };

    const res = await axios.post(`${API_URL}/messages/`, newMessage);
    const data = (await res.data) as MessageCreate;

    setMessages((prev) => [...prev, data.user_message, data.agent_message]);
    setMessage("");
  };

  const handleDeleteMessage = async (message_id: string) => {
    await axios.delete(`${API_URL}/messages/${message_id}`);

    setMessages((prev) => prev.filter((message) => message.id !== message_id));
  };

  const handleUpdateMessage = async (message_id: string, content: string) => {
    const res = await axios.put(`${API_URL}/messages/${message_id}`, {
      content,
    });
    const data = res.data as Message;

    setMessages((prev) =>
      prev.map((message) => (message.id === message_id ? data : message))
    );
  };

  // Visibility state handlers
  const handleToggleOpen = () => {
    setIsOpen((prev) => !prev);
  };
  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  // Scroll to the bottom when messages array changes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      className={`fixed bottom-4 right-4 rounded-2xl w-[400px] ${
        isOpen
          ? isExpanded
            ? "w-full h-full max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]"
            : "h-[700px]"
          : "h-fit"
      } bg-white shadow-xl flex flex-col justify-between`}
    >
      <div className={`flex items-center justify-between p-2`}>
        {isOpen ? (
          <Button handleClick={handleToggleExpand} size={28}>
            <PiArrowsOutSimple size={16} />
          </Button>
        ) : (
          <span className="px-2 font-semibold">Chat with Ava</span>
        )}

        <Button handleClick={handleToggleOpen} size={28}>
          {isOpen ? <PiMinus size={16} /> : <PiPlus size={16} />}
        </Button>
      </div>
      {isOpen && (
        <>
          {/* Header section with Ava details */}
          <div className="flex flex-col items-center py-2">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-300 rounded-full mb-2">
              <PiSparkle size={32} color="white" />
            </div>
            <h2 className="font-semibold">Hey👋, I&apos;m Ava</h2>
            <p className="text-gray-500 text-sm">
              Ask me anything or pick a place to start
            </p>
          </div>

          {/* Message list display section */}

          {isLoading ? (
            <div className="flex flex-1 items-center justify-center">
              <div className="flex space-x-2">
                <div
                  className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0s" }}
                ></div>
                <div
                  className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          ) : (
            <ul
              className="flex flex-1 flex-col gap-4 overflow-y-scroll text-sm custom-scrollbar pr-2 pl-4"
              ref={messagesEndRef}
            >
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  handleDeleteMessage={handleDeleteMessage}
                  handleUpdateMessage={handleUpdateMessage}
                />
              ))}
            </ul>
          )}
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
        </>
      )}
    </div>
  );
};

export default ChatWindow;
