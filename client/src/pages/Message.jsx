import React from "react";
import { useParams } from "react-router-dom";
import ConversationList from "../Components/message/ConversationList";
import ChatWindow from "../Components/message/ChatWindow";

const Message = () => {
  const { id } = useParams();

  return (
    <div className="flex w-screen h-screen bg-light-surface-container-highest">
      <div className="w-sm h-full p-4 pr-0">
        <ConversationList />
      </div>
      <div className="w-full h-full p-4">
        <ChatWindow />
      </div>
    </div>
  );
};

export default Message;
