import React, { useState, useEffect, useRef } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function ChatListItems({
  onSelectConversation,
  animationDelay,
  active,
  conversation,
  onDeleteConversation,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const timeoutRef = useRef(null);

  const trimString = (str) => {
    if (str.length > 20) {
      return str.substring(0, 18) + "...";
    } else {
      return str;
    }
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsMenuOpen(false);
    }, 200);
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const itemClasses = `chatlist__item flex items-center justify-between p-2 mb-2 rounded-md cursor-pointer transition-all w-full ${
    active ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"
  }`;

  return (
    <div
      style={{ animationDelay: `0.${animationDelay}s` }}
      onClick={() => onSelectConversation(conversation._id)}
      className={itemClasses}
    >
      <div className="userMeta flex-grow text-left">
        <p className="text-sm font-medium truncate">
          {trimString(conversation.name)}
        </p>
      </div>
      <div className="relative">
        <button
          className="ml-2 text-gray-600 hover:text-gray-800 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(!isMenuOpen);
          }}
        >
          <MoreVertIcon />
        </button>
        {isMenuOpen && (
          <div
            ref={menuRef}
            className="absolute right-0 top-8 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-50"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors"
              onClick={() => {
                onDeleteConversation(conversation._id);
                setIsMenuOpen(false);
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatListItems;
