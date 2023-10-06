import React, { useEffect, useState, useRef } from "react";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import SearchInput from "./SearchInput";
import MessagePresenter from "./MessagePresenter";
import MessageInput from "./MessageInput";

type Message = {
  sender: string;
  content: string;
  type: string;
};

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
      <SearchInput
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        messageSearch={messageSearch}
      />
      <MessagePresenter
        messages={messages}
        userColors={userColors}
        scrollToIndex={scrollToIndex}
        messageRefs={messageRefs}
      />
      <div className="p-4 border-none border-gray-300">
        <MessageInput
          username={username}
          message={message}
          setUsername={setUsername}
          setMessage={setMessage}
          handleSendClick={handleSendClick}
          handleKeyPress={handleKeyPress}
          userColors={userColors}
        />
      </div>
    </div>
  );
}

export function getRandomColor(): string {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default Chatting;
