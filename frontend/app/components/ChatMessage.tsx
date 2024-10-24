import { Message } from "../types";

interface MessageProps {
  message: Message;
}

const ChatMessage = ({ message }: MessageProps) => {
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
};

export default ChatMessage;
