import React, { useState } from "react";
import ChatListItems from "./ChatListItems";
import AddIcon from "@mui/icons-material/Add";
import NewChatDialog from "../DialogBox/DialogBox";

function ChatList({
  buttonOnClick,
  conversations,
  onSelectConversation,
  selectedConversation,
  files,
  onDeleteConversation,
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <div className="main__chatlist h-full overflow-hidden bg-white shadow-lg p-4 rounded-md">
      <button
        className="flex items-center justify-center bg-gradient-to-r from-[#1e3a8a] to-[#1d4ed8] font-bold text-white py-2 px-4 rounded-md hover:bg-[#1e40af] transition-colors w-full mb-4"
        onClick={() => setDialogOpen(true)}
      >
        <AddIcon />
        <span className="ml-2">New Chat</span>
      </button>
      <NewChatDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        handleNewChat={buttonOnClick}
        files={files}
      />
      <div className="chatlist__items overflow-auto h-screen custom-scrollbar">
        {[...conversations].reverse().map((conversation, index) => (
          <ChatListItems
            key={conversation._id}
            onSelectConversation={onSelectConversation}
            conversation={conversation}
            animationDelay={index + 1}
            active={
              selectedConversation &&
              conversation._id === selectedConversation._id
                ? "active"
                : ""
            }
            onDeleteConversation = {onDeleteConversation}
          />
        ))}
      </div>
    </div>
  );
}

export default ChatList;
