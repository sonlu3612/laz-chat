import { useState } from "react";

import ConversationList from "../Components/chat/ConversationList";
import ChatWindow from "../Components/chat/ChatWindow";
import ChatDetail from "../Components/chat/ChatDetail";
import CreateChannelDialog from "../Components/chat/CreateChannelDialog";
import Overlay from "../Components/Overlay";
import useChat from "../hooks/useChat";

const Chat = () => {
  const { isOverlayVisible, toggleOverlayOn, toggleOverlayOff, sendMessage } =
    useChat();

  // Detail view state

  const [isDetailViewVisible, setIsDetailViewVisible] = useState(false);

  // Handlers

  const handleToggleDetail = () => {
    setIsDetailViewVisible((prev) => !prev);
  };

  const handleHideDetail = () => {
    setIsDetailViewVisible(false);
  };

  return (
    <div className="flex w-screen h-screen bg-light-surface-container-highest">
      <Overlay isVisible={isOverlayVisible} onClose={toggleOverlayOff}>
        <CreateChannelDialog onClose={toggleOverlayOff} />
      </Overlay>
      <div className="min-w-md w-md h-full p-4 pr-0">
        <ConversationList onNewChannelClick={toggleOverlayOn} />
      </div>
      <div className="w-full h-full p-4">
        <ChatWindow
          sendMessage={sendMessage}
          onToggleDetail={handleToggleDetail}
          isDetailsOpen={isDetailViewVisible}
        />
      </div>
      <div
        hidden={!isDetailViewVisible}
        className="min-w-md w-md h-full p-4 pl-0"
      >
        {/* TODO: hideBackButton depends on breakpoint */}
        <ChatDetail hideBackButton={false} onHide={handleHideDetail} />
      </div>
    </div>
  );
};

export default Chat;
