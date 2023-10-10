import React, { useEffect, RefObject, MutableRefObject, useRef } from "react";

type Message = {
  sender: string;
  content: string;
};

type MessagePresenterProps = {
  messages: Message[];
  userColors: Record<string, string>;
  scrollToIndex: number;
  messageRefs: MutableRefObject<React.MutableRefObject<HTMLLIElement | null>[]>;
  messageListRef: RefObject<HTMLDivElement>;
  searchValue: string;
};

function MessagePresenter({
  messages,
  userColors,
  scrollToIndex,
  messageRefs,
  messageListRef,
  searchValue,
}: MessagePresenterProps) {
  useEffect(() => {
    if (messageListRef.current && scrollToIndex !== -1) {
      const targetElement = messageRefs.current[scrollToIndex];
      if (targetElement && targetElement.current) {
        targetElement.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [messageListRef, messageRefs, messages, scrollToIndex]);

  // 검색어 하이라이팅 함수
  const highlightSearchText = (text: string) => {
    if (!searchValue || searchValue.trim() === "") {
      return text;
    }

    const regex = new RegExp(`(${searchValue})`, "gi");
    const parts = text.split(regex);
    return (
      <>
        {parts.map((part, index) =>
          regex.test(part) ? (
            <span key={index} className="bg-red-400 text-black px-1">
              {part}
            </span>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </>
    );
  };

  const liRef = useRef<HTMLLIElement | null>(null);

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
                if (messageRefs.current && el) {
                  liRef.current = el;
                  messageRefs.current[index] = liRef;
                }
              }}
            >
              <div
                className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2"
                style={{
                  backgroundColor: userColors[message.sender],
                }}
              >
                {message.sender ? message.sender.charAt(0) : ""}
              </div>
              <div>
                <p className="text-xs font-semibold">{message.sender}</p>
                <p className="text-gray-700">
                  {highlightSearchText(message.content)}
                </p>
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
