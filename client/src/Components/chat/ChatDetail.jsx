const ChatDetail = ({ onHide, hideBackButton = false }) => {
  return (
    <div>
      {!hideBackButton && (
        <button
          className="mb-4 px-4 py-2 bg-light-primary-container text-light-on-primary-container rounded-lg"
          onClick={onHide}
        >
          Hide
        </button>
      )}
      <div>Chat Detail Content</div>
    </div>
  );
};

export default ChatDetail;
