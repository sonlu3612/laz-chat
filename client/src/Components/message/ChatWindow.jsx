import { useState } from "react";
import React from "react";

import InfoIcon from "../../assets/icons/InfoIcon";
import SendIcon from "../../assets/icons/SendIcon";

const ChatWindow = () => {
  const mockMessages = [
    {
      id: 1,
      nickname: "John Doe",
      text: "Hi team, just a reminder about the adoption event this Saturday!",
      isMe: false,
    },
    {
      id: 2,
      nickname: "",
      text: "Got it, thanks for the reminder!",
      isMe: true,
    },
    {
      id: 3,
      nickname: "Jane Smith",
      text: "I've already started preparing the flyers. Does anyone need help with anything?",
      isMe: false,
    },
    {
      id: 4,
      nickname: "",
      text: "That's great, Jane! I'm still working on the social media posts.",
      isMe: true,
    },
    {
      id: 5,
      nickname: "John Doe",
      text: "I'll be setting up the registration table. We'll need some pens and clipboards.",
      isMe: false,
    },
    {
      id: 6,
      nickname: "Jane Smith",
      text: "I can bring those, John. I have a box of office supplies.",
      isMe: false,
    },
    {
      id: 7,
      nickname: "",
      text: "Perfect! Thanks, Jane. I'll make sure to mention the supplies in the checklist.",
      isMe: true,
    },
    {
      id: 8,
      nickname: "John Doe",
      text: "Also, remember to bring water bowls for the animals. It's going to be a warm day.",
      isMe: false,
    },
    {
      id: 9,
      nickname: "Jane Smith",
      text: "Good point, John. I'll add that to my list.",
      isMe: false,
    },
    {
      id: 10,
      nickname: "",
      text: "I'll bring some extra water bottles for the volunteers too.",
      isMe: true,
    },
    {
      id: 11,
      nickname: "John Doe",
      text: "Excellent! Every little bit helps.",
      isMe: false,
    },
    {
      id: 12,
      nickname: "Jane Smith",
      text: "Has anyone confirmed the vet's availability for the health checks?",
      isMe: false,
    },
  ];

  const [messages, setMessages] = useState(mockMessages);
  const [currentMessage, setCurrentMessage] = useState("");

  return (
    <div className="w-full h-full bg-light-surface flex flex-col rounded-2xl">
      {/* Header */}
      <div className="p-4 border-b border-light-outline flex">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-gray-400 flex-shrink-0">
          {/* Placeholder for Avatar component or image */}
        </div>

        {/* Name and Last Message */}
        <div className="flex-1 ml-2 overflow-hidden">
          <p className="font-bold truncate">Conversation Name</p>
          <p className="text-gray-600 text-sm truncate">Is online</p>
        </div>

        <div className="mr-0 flex my-auto">
          <button className="w-10 h-10 rounded-full hover:bg-light-primary-container">
            <InfoIcon className="w-6 h-6 m-auto  hover:fill-light-on-primary-container hover:w-6.5 hover:h-6.5 transition-all" />
          </button>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg) =>
          msg.isMe ? (
            <div className="flex items-start space-x-3 mb-4 justify-end">
              <div className="flex-1 text-right">
                <div className="flex items-center space-x-2 justify-end">
                  <span className="font-semibold text-light-on-surface"></span>
                </div>
                <p className="text-light-on-surface-variant">{msg.text}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-start space-x-3 mb-4">
              <img alt="Profile" className="w-10 h-10 rounded-full" />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-light-on-surface">
                    {msg.nickname}
                  </span>
                </div>
                <p className="text-light-on-surface-variant">{msg.text}</p>
              </div>
            </div>
          )
        )}
      </div>

      {/* Input area */}
      <div className="p-4 flex">
        <input
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          placeholder="Type a message..."
          autoComplete="off"
          className="flex-1 border rounded-full px-4 py-2 mr-2 bg-light-surface text-light-on-surface border-light-outline focus:outline-none focus:border-light-primary"
        />

        <button
          className=" hover:bg-light-secondary-container rounded-full w-12 h-full flex"
          disabled={!currentMessage.trim()}
        >
          {currentMessage.trim() ? (
            <SendIcon className="w-6 h-6 fill-light-on-primary-container m-auto" />
          ) : (
            <p className="m-auto">🖕</p>
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
