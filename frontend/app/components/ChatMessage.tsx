"use client";

import { Message } from "../types";
import { PiTrash, PiPencilSimple, PiX } from "react-icons/pi";
import { useState } from "react";
import ChatInput from "./ChatInput";

interface MessageProps {
  message: Message;
  handleDeleteMessage: (id: number) => void;
  handleUpdateMessage: (id: number, content: string) => void;
}

const ChatMessage = ({
  message,
  handleDeleteMessage,
  handleUpdateMessage,
}: MessageProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const onUpdateMessage = (id: number, content: string) => {
    handleUpdateMessage(id, content);
    setIsEditing(false);
  };

  return (
    <li
      className={`flex items-center gap-1 w-full group ${
        message.sender == "user" && "justify-end"
      }`}
      key={message.id}
    >
      {/* Action button section - includes delete and edit buttons */}
      {message.sender == "user" && (
        <div className="flex gap-1 items-center">
          <button
            onClick={() => handleDeleteMessage(message.id)}
            className="scale-0 opacity-0 bg-red-400 group-hover:scale-100 group-hover:opacity-100 flex items-center justify-center h-7 min-w-7 rounded-full text-white transition-all"
          >
            <PiTrash size={16} />
          </button>
          <button
            onClick={() => setIsEditing((prev) => !prev)}
            className={`${
              isEditing ? "scale-100 opacity-100" : "scale-0 opacity-9"
            } bg-blue-400 group-hover:scale-100 group-hover:opacity-100 flex items-center justify-center h-7 min-w-7 rounded-full text-white transition-all`}
          >
            {isEditing ? <PiX size={16} /> : <PiPencilSimple size={16} />}
          </button>
        </div>
      )}

      {/* Chat bubble */}
      <div
        className={`flex flex-col py-2 px-4 transition-all ${
          message.sender == "user"
            ? `items-end ${
                isEditing
                  ? "bg-white border border-gray-500 text-black w-full"
                  : "bg-purple-500"
              } text-white rounded-l-3xl rounded-br-3xl`
            : "bg-gray-100 rounded-r-3xl rounded-bl-3xl"
        }`}
      >
        {isEditing ? (
          <div className="flex flex-col gap-1 w-full">
            <span className="text-xs">Edit message:</span>
            <ChatInput
              message={message}
              handleMessageUpdate={onUpdateMessage}
            />
          </div>
        ) : (
          <p>{message.content}</p>
        )}
      </div>
    </li>
  );
};

export default ChatMessage;
