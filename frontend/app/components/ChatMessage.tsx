"use client";

import { Message } from "../types";
import {
  PiTrash,
  PiPencilSimple,
  PiX,
  PiPaperPlaneRight,
} from "react-icons/pi";
import { useState } from "react";
import Button from "./Button";

interface MessageProps {
  message: Message;
  handleDeleteMessage: (id: string) => void;
  handleUpdateMessage: (id: string, content: string) => void;
}

const ChatMessage = ({
  message,
  handleDeleteMessage,
  handleUpdateMessage,
}: MessageProps) => {
  const [editingMessage, setEditingMessage] = useState<string>(message.content);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <li
      className={`flex items-center gap-1 w-full group ${
        message.sender === "user" && "justify-end"
      }`}
      key={message.id}
    >
      {message.sender === "user" && (
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
      <div
        className={`flex flex-col py-2 px-4 transition-all ${
          message.sender === "user"
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
            <div className="flex gap-1 items-center -mx-2">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdateMessage(message.id, editingMessage);
                  setIsEditing(false);
                }}
                className="flex-1 flex"
              >
                <input
                  type="text"
                  className="flex-1 p-2 focus:outline-none focus:ring-[0.5px] rounded-full ring-gray-700 text-sm"
                  value={editingMessage}
                  onChange={(e) => setEditingMessage(e.target.value)}
                />
              </form>
              <Button
                handleClick={() => {
                  handleUpdateMessage(message.id, editingMessage);
                  setIsEditing(false);
                }}
                size={28}
              >
                <PiPaperPlaneRight size={16} />
              </Button>
            </div>
          </div>
        ) : (
          <p>{message.content}</p>
        )}
      </div>
    </li>
  );
};

export default ChatMessage;
