import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import {
  fetchAllChannels,
  fetchMessagesWithUsers,
  setCurrentChannelId,
  fetchUsersForMessages,
} from "../redux/reducers/chat";

const useChat = (channelId) => {
  // Redux
  const dispatch = useDispatch();
  const myUser = useSelector((state) => state.auth.user);

  // State
  const [connection, setConnection] = useState(null);
  const [isOverlayVisible, setOverlayVisible] = useState(false);

  let mockId = 1;

  // Toggle overlay handlers
  const toggleOverlayOn = () => {
    setOverlayVisible(true);
  };

  const toggleOverlayOff = () => {
    setOverlayVisible(false);
  };

  // Fetch all channels on mount
  useEffect(() => {
    dispatch(fetchAllChannels());
  }, [dispatch]);

  // Handle channel change
  useEffect(() => {
    dispatch(setCurrentChannelId(channelId));

    if (channelId != undefined) {
      dispatch(fetchMessagesWithUsers());
    }
  }, [channelId, dispatch]);

  // Setup SignalR connection
  useEffect(() => {
    if (!channelId) return;

    // URL của hub nên được lưu trong biến môi trường
    const hubUrl = "https://localhost:5016/Chat";

    const newConnection = new HubConnectionBuilder()
      .withUrl(hubUrl)
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);

    return () => {
      newConnection.stop();
    };
  }, [channelId]);

  // Start connection and setup event handlers
  useEffect(() => {
    if (!myUser || !connection) return;

    const startConnection = async () => {
      try {
        await connection.start();
        console.log("SignalR Connected.");

        const userConnection = {
          ChannelId: parseInt(channelId),
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
                  content: message,
                },
              ],
              channelId: channelId,
            })
          );
          mockId++;
        });

        connection.on("UserTyping", (userName) => {
          console.log(`${userName} is typing...`);
        });
      } catch (e) {
        console.error("Connection failed: ", e);
      }
    };

    startConnection();

    return () => {
      if (connection && myUser) {
        console.log("Leaving channel:", channelId);
        connection.invoke(
          "LeaveChatRoom",
          channelId,
          `${myUser.firstName} ${myUser.lastName}`
        );
      }
    };
  }, [connection, channelId, myUser, dispatch]);

  // Send message handler
  const sendMessage = (message) => {
    if (connection && myUser) {
      connection.invoke(
        "SendMessage",
        channelId,
        myUser.firstName + " " + myUser.lastName,
        message
      );
    }
  };

  return {
    isOverlayVisible,
    toggleOverlayOn,
    toggleOverlayOff,
    sendMessage,
  };
};

export default useChat;
