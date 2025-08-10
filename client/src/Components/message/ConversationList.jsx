import SearchBox from "../SearchBox";

const ConversationList = () => {
  return (
    <div className="w-full h-full bg-light-surface rounded-2xl flex flex-col">
      <p className="pt-3 px-4 text-2xl">Laz Chat</p>
      <div className="pt-3 pb-3 px-4">
        <SearchBox />
      </div>
      <div className="w-full h-full overflow-auto">
        <div className="bg-amber-200 mx-2" style={{ height: "2000px" }}></div>
      </div>
      <div className="mt-auto pt-3 pb-2 px-4">Your name</div>
    </div>
  );
};

export default ConversationList;
