import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import SettingIcon from "../../assets/icons/SettingIcon";
import SearchBox from "../SearchBox";
import ConversationItem from "./ConversationItem";

const ConversationList = () => {
  const { id } = useParams();

  const mockConversationList = [
    {
      conversationId: "1",
      avatar: undefined,
      isSelected: true,
      conversationName: "User/Conversation Name 1",
      lastMessage: "Last Message",
      timestamp: "12:00 PM",
    },
    {
      conversationId: "2",
      avatar: undefined,
      isSelected: false,
      conversationName: "User/Conversation Name 2",
      lastMessage: "Last Message",
      timestamp: "12:00 PM",
    },
    {
      conversationId: "3",
      avatar: undefined,
      isSelected: false,
      conversationName: "User/Conversation Name 3",
      lastMessage: "Last Message",
      timestamp: "12:00 PM",
    },
    {
      conversationId: "4",
      avatar: undefined,
      isSelected: false,
      conversationName: "User/Conversation Name 4",
      lastMessage: "Last Message",
      timestamp: "12:00 PM",
    },
    {
      conversationId: "5",
      avatar: undefined,
      isSelected: false,
      conversationName: "User/Conversation Name 5",
      lastMessage: "Last Message",
      timestamp: "12:00 PM",
    },
  ];

  const [list, setList] = useState(mockConversationList);

  useEffect(() => {
    setList((prevList) =>
      prevList.map((item) => {
        const isCurrent = item.conversationId === id;
        const wasSelected = item.isSelected;

        if (isCurrent === true && wasSelected === false)
          return { ...item, isSelected: true };
        else if (isCurrent === false && wasSelected === true)
          return { ...item, isSelected: false };
        return item;
      })
    );
  }, [id]);

  return (
    <div className="w-full h-full bg-light-surface rounded-2xl flex flex-col">
      <p className="pt-3 px-4 text-2xl">Laz Chat</p>

      <div className="pt-3 pb-3 px-4">
        <SearchBox />
      </div>

      <div className="w-full h-full overflow-y-auto">
        <div className="mr-2">
          {list.map((item) => (
            <ConversationItem
              key={item.conversationId}
              conversationId={item.conversationId}
              avatar={item.avatar}
              isSelected={item.isSelected}
              conversationName={item.conversationName}
              lastMessage={item.lastMessage}
              timestamp={item.timestamp}
            />
          ))}
        </div>
      </div>

      <div className="mt-auto px-4 py-3 border-t flex">
        <div className="w-10 h-10 rounded-full bg-gray-400 flex-shrink-0">
          {/* Placeholder for Avatar component or image */}
        </div>

        <div className="flex-1 ml-2 overflow-hidden">
          <p className="font-bold text-sm truncate">Your name</p>
          <p className="text-gray-600 text-sm truncate">Your status</p>
        </div>

        <SettingIcon className="w-6 h-6 m-auto" fill={"#000000"} />
      </div>
    </div>
  );
};

export default ConversationList;
