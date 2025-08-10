import SearchBox from "../SearchBox";
import ConversationItem from "./ConversationItem";

const ConversationList = () => {
  return (
    <div className="w-full h-full bg-light-surface rounded-2xl flex flex-col">
      <p className="pt-3 px-4 text-2xl">Laz Chat</p>
      <div className="pt-3 pb-3 px-4">
        <SearchBox />
      </div>
      <div className="w-full h-full overflow-y-auto">
        <div className="mr-2">
          <ConversationItem
            avatar={""}
            isSelected={true}
            conversationName="User/Conversation Name 1"
            lastMessage="Last Message"
            timestamp="12:00 PM"
          />
          <ConversationItem
            avatar={""}
            conversationName="User/Conversation Name 2"
            lastMessage="Last Message"
            timestamp="12:00 PM"
          />
          <ConversationItem
            avatar={""}
            conversationName="User/Conversation Name 3"
            lastMessage="Last Message"
            timestamp="12:00 PM"
          />
          <ConversationItem
            avatar={""}
            conversationName="User/Conversation Name 4"
            lastMessage="Last Message"
            timestamp="12:00 PM"
          />
          <ConversationItem
            avatar={""}
            conversationName="User/Conversation Name 5"
            lastMessage="Last Message"
            timestamp="12:00 PM"
          />
        </div>
      </div>
      <div className="mt-auto pt-3 pb-2 px-4">Your name</div>
    </div>
  );
};

export default ConversationList;
