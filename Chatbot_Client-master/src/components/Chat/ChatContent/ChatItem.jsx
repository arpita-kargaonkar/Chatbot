import React, { useState } from "react";
import { IconButton, Typography } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import "./ChatContent.css";

function ChatItem({ msg, user, animationDelay }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(msg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      style={{ animationDelay: `0.${animationDelay}s` }} 
      className={`chat__item ${user} animate-fadeIn`}
    >
      <div className="chat__item__content p-4 bg-white rounded shadow-md flex flex-col space-y-2 relative">
        <div className="chat__msg">{msg}</div>
        {user === "other" && (
          <div className="flex justify-end mt-2">
            <IconButton 
              color="primary" 
              onClick={copyToClipboard}
              size="small"
              className="mr-2"
            >
              {copied ? <Typography variant="body2">Copied</Typography> : <ContentCopyIcon fontSize="small" />}
            </IconButton>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatItem;
