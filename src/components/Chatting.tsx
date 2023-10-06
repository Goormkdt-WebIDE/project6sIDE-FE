import React, { useEffect, useState, useRef } from "react";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

type ChatMessage = {
  sender: string;
  content: string;
  type: string;
};

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function Chatting() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [stompClient, setStompClient] = useState<any>(null);
  const [userColors, setUserColors] = useState<{ [key: string]: string }>({});
  const [searchValue, setSearchValue] = useState<string>("");
  const messageRefs = useRef([]);
  const messageListRef = useRef(null);
  const [scrollToIndex, setScrollToIndex] = useState(-1);
  const scrollToRef = useRef(null);

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

    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }

    return () => {
      client.disconnect();
    };
  }, [messages]);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleUserNameChange = (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);

    if (!userColors[newUsername]) {
      const newColor = getRandomColor();
      setUserColors((prevColors) => ({
        ...prevColors,
        [newUsername]: newColor,
      }));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && username.trim() && message.trim()) {
      handleSendClick();
    }
  };

  const handleSendClick = () => {
    if (username.trim() && message.trim()) {
      const chatMessage = { sender: username, content: message, type: "CHAT" };
      stompClient.send("/chat/sendMessage", {}, JSON.stringify(chatMessage));
      setMessage("");
    }
  };

  const messageSearch = () => {
    const searchValueLower = searchValue.toLowerCase();
    const index = messages.findIndex((message) =>
      message.content.toLowerCase().includes(searchValueLower)
    );

    if (index !== -1) {
      if (messageRefs.current[index]) {
        messageRefs.current[index].scrollIntoView();
        // console.log("검색어 인덱스 위치:", index);
      }
    }
  };

  useEffect(() => {
    if (scrollToRef.current) {
      scrollToRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [scrollToIndex]);

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
