import { useState } from "react";

const CreateChannelDialog = ({ onClose }) => {
  const [channelName, setChannelName] = useState("");
  const MAX_LENGTH = 128;

  return (
    <div className="bg-light-surface-container-highest rounded-3xl shadow-lg p-6 w-full min-w-md mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center pb-3">
        <h2 className="text-xl font-semibold text-on-surface-container">
          Create new channel
        </h2>
        <button
          className="text-light-on-surface-variant hover:bg-light-surface-dim rounded-full p-2 transition-colors"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Body */}
      <div className="mt-4">
        <input
          type="text"
          className="w-full outline-1 focus:border-2 border-light-primary focus:p-1.5 rounded-md p-2"
          value={channelName}
          maxLength={MAX_LENGTH}
          onChange={(e) => setChannelName(e.target.value)}
          placeholder="Channel name"
        />
        <div className="text-right text-light-on-surface-variant text-sm mt-1">
          {channelName.length}/{MAX_LENGTH}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 flex justify-end">
        <button
          className="px-4 py-2 mr-3 rounded-3xl text-sm font-medium text-light-primary hover:bg-light-surface-dim"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 rounded-3xl text-sm font-medium text-light-on-primary-container bg-light-primary-container cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          disabled={channelName.length === 0}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateChannelDialog;
