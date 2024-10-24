"use client";
import { useState } from "react";
import { Message } from "../types";
import Button from "./Button";
import { PiPaperPlaneRight } from "react-icons/pi";

interface ChatInput {
  message?: Message;
  handleMessageSubmit?: (content: string) => void;
  handleMessageUpdate?: (id: number, content: string) => void;
}

const ChatInput = ({
  message,
  handleMessageSubmit,
  handleMessageUpdate,
}: ChatInput) => {
  const [editingMessage, setEditingMessage] = useState<string>(
    message ? message.content : ""
  );

  const handleSubmit = () => {
    if (message && handleMessageUpdate) {
      handleMessageUpdate(message.id, editingMessage);
    } else if (handleMessageSubmit) {
      handleMessageSubmit(editingMessage);
      setEditingMessage("");
    }
  };

  return (
    <div className="flex flex-1 gap-2 items-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex-1 flex"
      >
        <input
          placeholder={!message ? "Your question" : ""}
          type="text"
          className="flex-1 px-2 py-1 focus:outline-none focus:ring-[0.5px] rounded-full ring-gray-700 text-sm"
          value={editingMessage}
          onChange={(e) => setEditingMessage(e.target.value)}
        />
      </form>
      <Button
        handleClick={() => {
          handleSubmit();
        }}
        size={28}
      >
        <PiPaperPlaneRight size={16} />
      </Button>
    </div>
  );
};

export default ChatInput;
