const Overlay = ({ children, isVisible, onClose }) => {
  if (!isVisible) {
    return null;
  }

  const handleOverlayClick = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center"
      style={{
        zIndex: 999,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
      onClick={handleOverlayClick}
    >
      <div onClick={handleContentClick}>{children}</div>
    </div>
  );
};

export default Overlay;
