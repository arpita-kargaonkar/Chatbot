import React from "react";
import { Typography } from '@mui/material'
function WelcomeMessage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md p-8 bg-white shadow-lg rounded-lg">
        <Typography
          variant="h6"
          color="textSecondary"
          align="center"
          gutterBottom
        >
          Welcome to OAM Chatbot. Click on New chat to begin a conversation.
        </Typography>
      </div>
    </div>
  );
}

export default WelcomeMessage;
