import React, {
  useEffect,
  useState,
  useRef,
  RefObject,
  KeyboardEvent,
} from "react";
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [stompClient, setStompClient] = useState<any>(null);
  const [userColors, setUserColors] = useState<{ [key: string]: string }>({});
  const [searchValue, setSearchValue] = useState<string>("");
  const messageRefs = useRef<RefObject<HTMLLIElement | null>[]>([]);
  const messageListRef = useRef<HTMLDivElement | null>(null);
  const [scrollToIndex, setScrollToIndex] = useState<number>(-1);
  const [nextMatchIndex, setNextMatchIndex] = useState<number>(-1);

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

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
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
      if (!Object.keys(userColors).includes(username as string)) {
        const newUserColors = { [username]: getRandomColor() };
        setUserColors({ ...userColors, ...newUserColors });
        console.log(userColors);
      }

      if (messageListRef.current) {
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        setScrollToIndex(messages.length);
      }

      setMessage("");
    }
  };

  // 메시지 검색과 스크롤 관련 이벤트 핸들러
  const messageSearch = (): void => {
    const searchValueLower: string = searchValue.toLowerCase();
    const index: number = messages.findIndex(
      (message, i) =>
        i > nextMatchIndex &&
        message.content.toLowerCase().includes(searchValueLower)
    );

    if (index !== -1) {
      if (messageRefs.current[index]) {
        messageRefs.current[index]?.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        setNextMatchIndex(index);
        setScrollToIndex(index);
      }
    } else {
      // 검색 결과가 없을 때 메시지 리스트의 맨 위로 스크롤
      setNextMatchIndex(-1);
      setScrollToIndex(-1);
      if (messageListRef.current) {
        messageListRef.current.scrollTop = 0;
      }
    }
  };

  return (
    <div className="container mx-auto h-full flex flex-col bg-cover bg-center bg-opacity-25 md:basis-[40%]">
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
        messageListRef={messageListRef}
        searchValue={searchValue}
      />
      <div className="pb-4 border-none border-gray-300">
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

// eslint-disable-next-line react-refresh/only-export-components
export function getRandomColor(): string {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default Chatting;
