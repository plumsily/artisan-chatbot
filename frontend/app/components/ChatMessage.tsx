import { Message } from "../types";
import { PiTrash } from "react-icons/pi";

interface MessageProps {
  message: Message;
  handleDeleteMessage: (id: string) => void;
}

const ChatMessage = ({ message, handleDeleteMessage }: MessageProps) => {
  return (
    <li
      className={`flex items-center gap-1 w-full group ${
        message.sender === "user" && "justify-end"
      }`}
      key={message.id}
    >
      {message.sender === "user" && (
        <button
          onClick={() => handleDeleteMessage(message.id)}
          className="scale-0 opacity-0 bg-red-400 group-hover:scale-100 group-hover:opacity-100 flex items-center justify-center h-7 min-w-7 rounded-full text-white transition-all"
        >
          <PiTrash size={16} />
        </button>
      )}
      <div
        className={`flex py-2 px-4 w-fit transition-all ${
          message.sender === "user"
            ? "items-end bg-purple-500 text-white rounded-l-3xl rounded-br-3xl"
            : "bg-gray-100 rounded-r-3xl rounded-bl-3xl"
        }`}
      >
        <p>{message.content}</p>
      </div>
    </li>
  );
};

export default ChatMessage;
