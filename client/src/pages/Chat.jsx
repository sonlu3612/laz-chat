import { useState } from "react";

import ConversationList from "../Components/chat/ConversationList";
import ChatWindow from "../Components/chat/ChatWindow";
import ChatDetail from "../Components/chat/ChatDetail";
import CreateChannelDialog from "../Components/chat/CreateChannelDialog";
import Overlay from "../Components/Overlay";
import useBreakpoint, {
  MOBILE,
  SMALL_SCREEN,
  LARGE_SCREEN,
} from "../hooks/useBreakpoint";
import useChat from "../hooks/useChat";
import { useParams } from "react-router-dom";

// TODO: Show empty message when the conversation is not existed or not selected
const Chat = () => {
  const { isOverlayVisible, toggleOverlayOn, toggleOverlayOff, sendMessage } =
    useChat();
  const breakpoint = useBreakpoint();
  const { channelId } = useParams();

  // Chat view state (This only applies to mobile view)
  const [isChatViewVisible, setIsChatViewVisible] = useState(
    channelId == "" ? false : true
  );
  // Detail view state
  const [isDetailViewVisible, setIsDetailViewVisible] = useState(false);

  // Handlers

  const handleToggleDetail = () => {
    setIsDetailViewVisible((prev) => !prev);
  };

  const handleHideDetail = () => {
    setIsDetailViewVisible(false);
  };

  const handleHideChat = () => {
    setIsChatViewVisible(false);
  };

  // Panel layout

  const OverlayPanel = () => (
    <Overlay isVisible={isOverlayVisible} onClose={toggleOverlayOff}>
      <CreateChannelDialog onClose={toggleOverlayOff} />
    </Overlay>
  );
  const ChannelListPanel = () => (
    <ConversationList onNewChannelClick={toggleOverlayOn} />
  );
  const ChatPanel = () => (
    <ChatWindow
      hideBackButton={breakpoint !== MOBILE}
      onHide={handleHideChat}
      sendMessage={sendMessage}
      onToggleDetail={handleToggleDetail}
      isDetailsOpen={isDetailViewVisible}
    />
  );
  const DetailPanel = () => (
    <ChatDetail
      hideBackButton={breakpoint === LARGE_SCREEN}
      onHide={handleHideDetail}
    />
  );

  // Render layout based on breakpoint

  // Mobile: only one panel is visible, default to channel list panel
  if (breakpoint === MOBILE)
    return (
      <div className="flex w-screen h-screen bg-light-surface-container-highest">
        <OverlayPanel />
        <div className="w-full h-full">
          {isChatViewVisible ? (
            isDetailViewVisible ? (
              <DetailPanel />
            ) : (
              <ChatPanel />
            )
          ) : (
            <ChannelListPanel />
          )}
        </div>
      </div>
    );

  // Small screen: two panels are visible, channel list panel and chat panel
  if (breakpoint === SMALL_SCREEN)
    return (
      <div className="flex w-screen h-screen bg-light-surface-container-highest">
        <OverlayPanel />
        <div className="min-w-md w-md h-full p-4 pr-0">
          <ChannelListPanel />
        </div>
        <div className="w-full h-full p-4">
          {isDetailViewVisible ? <DetailPanel /> : <ChatPanel />}
        </div>
      </div>
    );

  // The rest case: include large screen
  // Large screen: three panels are visible, channel list panel, chat panel and detail panel
  return (
    <div className="flex w-screen h-screen bg-light-surface-container-highest">
      <OverlayPanel />
      <div className="min-w-md w-md h-full p-4 pr-0">
        <ChannelListPanel />
      </div>
      <div className="w-full h-full p-4">
        <ChatPanel />
      </div>
      <div
        hidden={!isDetailViewVisible}
        className="min-w-md w-md h-full p-4 pl-0"
      >
        <DetailPanel />
      </div>
    </div>
  );
};

export default Chat;
