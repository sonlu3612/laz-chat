import { useDispatch, useSelector } from "react-redux";

import SettingIcon from "../../assets/icons/SettingIcon";
import SearchBox from "../SearchBox";
import ConversationItem from "./ConversationItem";
import ChatAddIcon from "../../assets/icons/ChatAddIcon";

const ConversationList = ({ onNewChannelClick }) => {
  const list = useSelector((state) => state.chat.channels);

  return (
    <div className="w-full h-full bg-light-surface rounded-2xl flex flex-col">
      <p className="pt-3 px-4 text-2xl">Laz Chat</p>

      <div className="pt-3 px-4">
        <button
          className="px-6 py-2 flex bg-light-primary-container rounded-2xl hover:cursor-pointer"
          onClick={onNewChannelClick}
        >
          <ChatAddIcon className="w-6 h-6 fill-light-on-primary-container" />
          <p className="pl-2 text-light-on-primary-container">New Channel</p>
        </button>
      </div>

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
