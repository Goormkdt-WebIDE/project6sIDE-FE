import React, { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client, IMessage } from "@stomp/stompjs";

const colors = [
  "#2196F3",
  "#32c787",
  "#00BCD4",
  "#ff5652",
  "#ffc107",
  "#ff85af",
  "#FF9800",
  "#39bbb0",
];

function Chatting() {
  const [username, setUsername] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [stompClient, setStompClient] = useState<Client | null>(null);

  const messageAreaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const socket = new SockJS("https://sside.shop/ws");
    const client = new Client();

    const connectCallback = () => {
      client.subscribe("/topic/public", onMessageReceived);

      sendSystemMessage("joined");
    };

    const errorCallback = (error: string) => {
      console.error("WebSocket error:", error);
      connectingElement.textContent =
        "Could not connect to WebSocket server. Please refresh this page to try again!";
      connectingElement.style.color = "red";
    };

    client.webSocketFactory = () => socket;
    client.onConnect = connectCallback;
    client.onStompError = errorCallback;

    client.activate();

    setStompClient(client);

    return () => {
      if (stompClient) {
        stompClient.deactivate();
        sendSystemMessage("left");
      }
    };
  }, []);

  const onMessageReceived = (message: IMessage) => {
    setMessages((prevMessages) => [...prevMessages, message]);

    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }
  };

  const sendSystemMessage = (type: string) => {
    if (stompClient) {
      const systemMessage = {
        sender: "System",
        content: `${username} ${type} the chat.`,
        type: "SYSTEM",
        date: Date.now(),
      };
      stompClient.publish({
        destination: "/chat/sendMessage",
        body: JSON.stringify(systemMessage),
      });
    }
  };

  const connect = (event: React.FormEvent) => {
    event.preventDefault();
    sendSystemMessage("joined");
  };

  const disconnect = () => {
    setUsername("");
    sendSystemMessage("left");
  };

  const sendMessage = (event: React.FormEvent) => {
    event.preventDefault();

    if (stompClient && message.trim() !== "") {
      const chatMessage = {
        sender: username,
        content: message,
        type: "CHAT",
        date: Date.now(),
      };
      stompClient.publish({
        destination: "/chat/sendMessage",
        body: JSON.stringify(chatMessage),
      });

      setMessage("");
    }
  };

  let connectingElement: HTMLDivElement | null = null;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-4">
        <h1 className="text-2xl font-semibold">Chat Room</h1>
      </div>
      <div className="bg-white p-4" ref={messageAreaRef}>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>
              {msg.headers["content-type"] === "SYSTEM" ? (
                <div className="event-message">{msg.body}</div>
              ) : (
                <div className="chat-message">
                  <i
                    className="w-6 h-6 mr-2"
                    style={{ backgroundColor: getAvatarColor(msg.body.sender) }}
                  >
                    {msg.body.sender[0]}
                  </i>
                  <span>{msg.body.sender}</span>
                  <p>{msg.body.content}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="fixed inset-x-0 bottom-0 pb-4">
        <form onSubmit={sendMessage}>
          <input
            type="text"
            id="message"
            className="w-full px-4 py-2 border-t border-gray-300 rounded-lg"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </form>
      </div>
      <div
        className="connecting absolute bottom-0 right-0 bg-white text-red-500 p-2"
        ref={(el) => (connectingElement = el)}
      >
        Connecting...
      </div>
    </div>
  );
}

function getAvatarColor(messageSender: string) {
  let hash = 0;
  for (let i = 0; i < messageSender.length; i++) {
    hash = 31 * hash + messageSender.charCodeAt(i);
  }
  const index = Math.abs(hash % colors.length);
  return colors[index];
}

export default Chatting;
