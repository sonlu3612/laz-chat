import React from "react";

const ChatWindow = () => {
  return (
    <div className="w-full h-full bg-light-surface flex flex-col rounded-2xl">
      {/* Header */}
      <div className="p-4 border-b border-light-outline flex">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-gray-400 flex-shrink-0">
          {/* Placeholder for Avatar component or image */}
        </div>

        {/* Name and Last Message */}
        <div className="flex-1 ml-2 overflow-hidden">
          <p className="font-bold truncate">Conversation Name</p>
          <p className="text-gray-600 text-sm truncate">Is online</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-light-outline">
        <button className="px-4 py-2 text-light-primary border-b-2 border-light-primary">
          Chat
        </button>
        <button className="px-4 py-2 text-light-on-surface-variant">
          Files
        </button>
        <button className="px-4 py-2 text-light-on-surface-variant">
          Tasks
        </button>
      </div>

      {/* Chat messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {/* Mock Message */}
        <div className="flex items-start space-x-3 mb-4">
          <img alt="Profile" className="w-10 h-10 rounded-full" />
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-light-on-surface">
                John Doe
              </span>
            </div>
            <p className="text-light-on-surface-variant">
              Hi team, just a reminder about the adoption event this Saturday!
            </p>
          </div>
        </div>
        {/* More messages would go here */}
        {/* Mock Outgoing Message */}
        <div className="flex items-start space-x-3 mb-4 justify-end">
          <div className="flex-1 text-right">
            <div className="flex items-center space-x-2 justify-end">
              <span className="font-semibold text-light-on-surface">You</span>
            </div>
            <p className="text-light-on-surface-variant">
              Got it, thanks for the reminder!
            </p>
          </div>
          <img alt="Profile" className="w-10 h-10 rounded-full" />
        </div>
      </div>

      {/* Input area */}
      <div className="p-4 flex">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 border rounded-full px-4 py-2 mr-2 bg-light-surface text-light-on-surface border-light-outline focus:outline-none focus:border-light-primary"
        />
        <button className="bg-light-primary text-light-on-primary rounded-full px-6 py-2">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
