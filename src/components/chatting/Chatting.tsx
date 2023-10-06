import React, { useEffect, useState, useRef } from "react";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

type Message = {
  sender: string;
  content: string;
  type: string;
};

function getRandomColor(): string {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function Chatting(): JSX.Element {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [stompClient, setStompClient] = useState<any>(null);
  const [userColors, setUserColors] = useState<{ [key: string]: string }>({});
  const [searchValue, setSearchValue] = useState<string>("");
  const messageRefs = useRef<Array<HTMLLIElement | null>>([]);
  const messageListRef = useRef<HTMLDivElement | null>(null);
  const [scrollToIndex, setScrollToIndex] = useState<number>(-1);
  const [nextMatchIndex, setNextMatchIndex] = useState<number>(-1);
  const scrollToRef = useRef<HTMLLIElement | null>(null);

  // WebSocket 연결 설정과 해제
  useEffect(() => {
    const socket = new SockJS("https://sside.shop/ws");
    const client = Stomp.over(socket);
    client.connect({}, () => {
      client.subscribe("/topic/public", (message) => {
        const receivedMessage = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      });
    });
    setStompClient(client);

    return () => {
      client.disconnect();
    };
  }, []);

  // 메시지 입력 관련 이벤트 핸들러
  const handleMessageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setMessage(e.target.value);
  };

  const handleUserNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newUsername: string = e.target.value;
    setUsername(newUsername);

    if (!userColors[newUsername]) {
      const newColor: string = getRandomColor();
      setUserColors((prevColors) => ({
        ...prevColors,
        [newUsername]: newColor,
      }));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && username.trim() && message.trim()) {
      handleSendClick();
    }
  };

  const handleSendClick = (): void => {
    if (username.trim() && message.trim() && stompClient) {
      const chatMessage: Message = {
        sender: username,
        content: message,
        type: "CHAT",
      };
      stompClient.send("/chat/sendMessage", {}, JSON.stringify(chatMessage));
      setMessage("");
    }
  };

  // 메시지 검색과 스크롤 관련 이벤트 핸들러
  const messageSearch = (): void => {
    const searchValueLower: string = searchValue.toLowerCase();
    const startIndex: number = nextMatchIndex !== -1 ? nextMatchIndex + 1 : 0;
    const index: number = messages.findIndex(
      (message, i) =>
        i >= startIndex &&
        message.content.toLowerCase().includes(searchValueLower)
    );

    if (index !== -1) {
      if (messageRefs.current[index]) {
        messageRefs.current[index]?.scrollIntoView();
        setNextMatchIndex(index);
      }
    } else {
      // 일치하는 메시지를 더 이상 찾지 못한 경우, 첫 번째 메시지로 돌아감
      setNextMatchIndex(-1);
    }
  };

  // 새로운 메시지가 추가될 때 스크롤을 아래로 이동
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="container mx-auto h-full flex flex-col bg-cover bg-center bg-opacity-25">
      <div className="p-4 border-b border-gray-300 flex items-center">
        <input
          type="text"
          className="w-full border border-gray-300 rounded p-2 mr-2"
          placeholder="Search Messages"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              messageSearch();
            }
          }}
        />
        <button
          className="bg-blue-400 text-white font-thin letter-spacing-2 py-2 px-4 rounded disabled:opacity-50 letter-spacing-2 hover:bg-blue-500 active:transform active:translate-y-3 active:border-transparent active:opacity-80 cursor-pointer"
          onClick={messageSearch}
        >
          SEARCH
        </button>
      </div>
      <>
        <div
          className="flex-grow overflow-y-auto list-none bg-white shadow-lg rounded-lg border-2 border-gray-300 p-4 m-4"
          ref={messageListRef}
        >
          <ul className="p-4">
            {messages.map((message, index) => (
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
                    backgroundColor: userColors[message.sender]
                      ? userColors[message.sender]
                      : getRandomColor(),
                  }}
                >
                  {message.sender ? message.sender.charAt(0) : ""}
                </div>
                <div>
                  <p className="text-xs font-semibold">{message.sender}</p>
                  <p className="text-gray-700">{message.content}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </>
      <div className="p-4 border-none border-gray-300">
        <div className="flex items-center">
          <input
            id="username"
            type="text"
            className="w-1/5 border border-gray-300 rounded p-2 mr-2"
            placeholder="Name"
            value={username}
            onChange={handleUserNameChange}
          />
          <input
            id="message"
            type="text"
            className="w-4/5 border border-gray-300 rounded p-2 mr-2"
            placeholder="Write a message"
            value={message}
            onChange={handleMessageChange}
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
    </div>
  );
}

export default Chatting;
