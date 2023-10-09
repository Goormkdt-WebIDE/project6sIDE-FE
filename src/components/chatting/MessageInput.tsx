import React from "react";
import { getRandomColor } from "./Chatting";

type MessageInputProps = {
  username: string;
  message: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  handleSendClick: () => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  userColors: Record<string, string>;
};

function MessageInput({
  username,
  message,
  setUsername,
  setMessage,
  handleSendClick,
  handleKeyPress,
}: MessageInputProps) {
  return (
    <div className="p-4 border-none border-gray-300">
      <div className="flex items-center">
        <input
          id="username"
          type="text"
          className="w-1/5 border border-gray-300 rounded p-2 mr-2"
          placeholder="Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          id="message"
          type="text"
          className="w-4/5 border border-gray-300 rounded p-2 mr-2"
          placeholder="Write a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          className="bg-blue-400 text-white font-thin letter-spacing-2 py-2 px-4 rounded disabled:opacity-50 letter-spacing-2 hover:bg-blue-500 active:transform active:translate-y-3 active:border-transparent active:opacity-80 cursor-pointer"
          onClick={handleSendClick}
          disabled={!username.trim() || !message.trim()}
        >
          SEND
        </button>
      </div>
    </div>
  );
}

export default MessageInput;
