const ConversationItem = ({
  avatar,
  conversationName,
  lastMessage,
  timestamp,
}) => {
  return (
    <div className="conversation-item flex items-center p-2 overflow-hidden">
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-gray-400 flex-shrink-0">
        {/* Placeholder for Avatar component or image */}
      </div>

      {/* Name and Last Message */}
      <div className="flex-1 ml-2 overflow-hidden">
        <p className="font-bold text-sm truncate">{conversationName}</p>
        <p className="text-gray-600 text-sm truncate">{lastMessage}</p>
      </div>

      {/* Timestamp */}
      <div className="text-gray-500 text-xs ml-auto">{timestamp}</div>
    </div>
  );
};

export default ConversationItem;
