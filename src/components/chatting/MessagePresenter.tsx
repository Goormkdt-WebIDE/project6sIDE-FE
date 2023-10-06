import React, { RefObject } from "react";
import { getRandomColor } from "./Chatting";

type Message = {
  sender: string;
  content: string;
};

type MessagePresenterProps = {
  messages: Message[];
  userColors: Record<string, string>;
  scrollToIndex: number;
  messageRefs: RefObject<HTMLLIElement>[];
  messageListRef: RefObject<HTMLDivElement>;
};

function MessagePresenter({
  messages,
  userColors,
  scrollToIndex,
  messageRefs,
  messageListRef,
}) {
  return (
    <div
      className="flex-grow overflow-y-auto list-none bg-white shadow-lg rounded-lg border-2 border-gray-300 p-4 m-4"
      ref={messageListRef}
    >
      <ul className="p-4">
        {messages && messages.length > 0 ? (
          messages.map((message, index) => (
            <li
              className="flex items-center border-gray-300 py-2"
              key={index}
              ref={(el) => {
                messageRefs.current[index] = el;
                if (index === scrollToIndex) {
                  scrollToRef.current = el;
                }
              }}
            >
              <div
                className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2"
                style={{
                  backgroundColor:
                    userColors[message.sender] || getRandomColor(),
                }}
              >
                {message.sender ? message.sender.charAt(0) : ""}
              </div>
              <div>
                <p className="text-xs font-semibold">{message.sender}</p>
                <p className="text-gray-700">{message.content}</p>
              </div>
            </li>
          ))
        ) : (
          <li>Welcome to the 6S IDE Chat!</li>
        )}
      </ul>
    </div>
  );
}

export default MessagePresenter;
