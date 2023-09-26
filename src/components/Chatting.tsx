// ChatApp.tsx
import React, { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

function Chatting() {
  const [username, setUsername] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]);
  const [stompClient, setStompClient] = useState<any>(null);

  const messageAreaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const socket = new SockJS("/ws");
    const client = Stomp.over(socket);

    const connectCallback = () => {
      client.subscribe("/topic/public", onMessageReceived);

      sendSystemMessage("joined");

      connectingElement.style.display = "none";
    };

    const errorCallback = (error: any) => {
      connectingElement.textContent =
        "Could not connect to WebSocket server. Please refresh this page to try again!";
      connectingElement.style.color = "red";
    };

    client.connect({}, connectCallback, errorCallback);

    setStompClient(client);

    return () => {
      if (stompClient) {
        stompClient.disconnect();
        sendSystemMessage("left");
      }
    };
  }, [username]);

  const onMessageReceived = (payload: any) => {
    const message = JSON.parse(payload.body);
    setMessages([...messages, message]);

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
      stompClient.send("/chat/sendMessage", {}, JSON.stringify(systemMessage));
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
      stompClient.send("/chat/sendMessage", {}, JSON.stringify(chatMessage));

      setMessage("");
    }
  };

  let connectingElement: HTMLDivElement | null = null;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-4">
        <h1 className="text-2xl font-semibold">Chat Room</h1>
      </div>
      <div className="bg-white p-4">
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>
              {msg.type === "SYSTEM" ? (
                <div className="event-message">{msg.content}</div>
              ) : (
                <div className="chat-message">
                  <i
                    className="w-6 h-6 mr-2"
                    style={{ backgroundColor: getAvatarColor(msg.sender) }}
                  >
                    {msg.sender[0]}
                  </i>
                  <span>{msg.sender}</span>
                  <p>{msg.content}</p>
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

export default Chatting;
