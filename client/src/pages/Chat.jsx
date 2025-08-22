import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import ConversationList from "../Components/chat/ConversationList";
import ChatWindow from "../Components/chat/ChatWindow";
import CreateChannelDialog from "../Components/chat/CreateChannelDialog";
import Overlay from "../Components/Overlay";
import {
  fetchAllChannels,
  fetchMessagesWithUsers,
  setCurrentChannelId,
} from "../redux/reducers/chat";

const Chat = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isOverlayVisible, setOverlayVisible] = useState(false);

  const toggleOverlayOn = () => {
    setOverlayVisible(true);
  };

  const toggleOverlayOff = () => {
    setOverlayVisible(false);
  };

  useEffect(() => {
    dispatch(fetchAllChannels());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setCurrentChannelId(id));

    if (id != undefined) dispatch(fetchMessagesWithUsers());
  }, [id]);

  return (
    <div className="flex w-screen h-screen bg-light-surface-container-highest">
      <Overlay isVisible={isOverlayVisible} onClose={toggleOverlayOff}>
        <CreateChannelDialog onClose={toggleOverlayOff} />
      </Overlay>
      <div className="min-w-sm w-sm h-full p-4 pr-0">
        <ConversationList onNewChannelClick={toggleOverlayOn} />
      </div>
      <div className="w-full h-full p-4">
        <ChatWindow />
      </div>
    </div>
  );
};

export default Chat;
