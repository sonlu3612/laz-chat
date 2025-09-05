import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import ConversationList from "../Components/chat/ConversationList";
import ChatWindow from "../Components/chat/ChatWindow";
import CreateChannelDialog from "../Components/chat/CreateChannelDialog";
import Overlay from "../Components/Overlay";
import {
  fetchAllChannels,
  fetchMessagesWithUsers,
  setCurrentChannelId,
  fetchUsersForMessages,
} from "../redux/reducers/chat";

const Chat = () => {
  // Redux
  const dispatch = useDispatch();
  const myUser = useSelector((state) => state.auth.user);

  // Param
  const { id } = useParams();

  // useState
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [connection, setConnection] = useState(null);

  let mockId = 1;

  // toggleOverlay
  const toggleOverlayOn = () => {
    setOverlayVisible(true);
  };

  const toggleOverlayOff = () => {
    setOverlayVisible(false);
  };

  // useEffect
  useEffect(() => {
    dispatch(fetchAllChannels());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setCurrentChannelId(id));

    if (id != undefined) dispatch(fetchMessagesWithUsers());
  }, [id, dispatch]);

  useEffect(() => {
    if (!id) return;

    // URL của hub nên được lưu trong biến môi trường
    const hubUrl = "https://localhost:5016/Chat";

    const newConnection = new HubConnectionBuilder()
      .withUrl(hubUrl)
      .configureLogging(LogLevel.Information) // <-- Thêm dòng này để bật logging
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);

    return () => {
      newConnection.stop();
    };
  }, [id]);

  useEffect(() => {
    if (!myUser) return;
    if (connection) {
      try {
        connection.start().then(() => {
          console.log("SignalR Connected.");

          const userConnection = {
            ChannelId: parseInt(id),
            User: {
              FirstName: myUser.firstName,
              LastName: myUser.lastName,
            },
          };

          connection.invoke("JoinSpecificChatRoom", userConnection);

          connection.on("ReceiveMessage", (user, message) => {
            console.log("Message received: ", { user, message });
            dispatch(
              fetchUsersForMessages({
                message: [
                  {
                    id: mockId,
                    userId: 1, // Test
                    // sentAt: new Date(),
                    content: message,
                  },
                ],
                channelId: id,
              })
            );
            mockId++;
          });

          connection.on("UserTyping", (userName) => {
            console.log(`${userName} is typing...`);
          });
        });
      } catch (e) {
        console.error("Connection failed: ", e);
      }

      return () => {
        console.log("Leaving channel:", id);
        connection.invoke(
          "LeaveChatRoom",
          id,
          `${myUser.FirstName} ${myUser.LastName}`
        );
      };
    }
  }, [connection, id, myUser, dispatch]);

  // sendMessage
  const sendMessage = (message) => {
    connection.invoke(
      "SendMessage",
      id,
      myUser.firstName + " " + myUser.lastName,
      message
    );
  };

  return (
    <div className="flex w-screen h-screen bg-light-surface-container-highest">
      <Overlay isVisible={isOverlayVisible} onClose={toggleOverlayOff}>
        <CreateChannelDialog onClose={toggleOverlayOff} />
      </Overlay>
      <div className="min-w-sm w-sm h-full p-4 pr-0">
        <ConversationList onNewChannelClick={toggleOverlayOn} />
      </div>
      <div className="w-full h-full p-4">
        <ChatWindow sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default Chat;
