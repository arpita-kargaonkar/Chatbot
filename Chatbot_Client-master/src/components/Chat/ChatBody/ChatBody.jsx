import React, { useState, useEffect, useRef } from "react";
import ChatList from "../ChatList/ChatList";
import ChatContent from "../ChatContent/ChatContent";
import axios from "axios";
import "./ChatBody.css";

function ChatBody({ token, files }) {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chatListWidth, setChatListWidth] = useState(250);
  const dividerRef = useRef(null);
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const ML_URL = "http://127.0.0.1:8000";
  const handleMouseDown = (e) => {
    e.preventDefault();
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    e.preventDefault();
    setChatListWidth(e.clientX);
  };

  const handleMouseUp = (e) => {
    e.preventDefault();
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const getAllConversations = () => {
    {
      // Fetch all conversations on mount]
      const token = localStorage.getItem("token");
      const id = token ? JSON.parse(atob(token.split(".")[1])).id : null;
      console.log(id);
      axios
        .get(
          `${BACKEND_URL}/conversations/getall`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              user_id: id,
            },
          }
        )
        .then((response) => {
          setConversations(response.data);
        })
        .catch((error) =>
          console.error("Error fetching conversations:", error)
        );
      // console.log("useEffect");
    }
  };
  useEffect(getAllConversations, []);

  const handleSelectConversation = (conversationId) => {
    const token = localStorage.getItem("token");
    axios
      .get(
        `${BACKEND_URL}/conversations/id`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { conversation_id: conversationId },
        }
      )
      .then((response) => {
        setSelectedConversation(response.data);
      })
      .catch((error) => console.error("Error fetching conversation:", error));
  };

  const handleNewChat = (pdfName) => {
    const token = localStorage.getItem("token");
    const id = token ? JSON.parse(atob(token.split(".")[1])).id : null;
    console.log(id);
    axios
      .post(
        `${BACKEND_URL}/conversations/save`,
        {
          user_id: id,
          pdfName: pdfName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setConversations([...conversations, response.data]);
        setSelectedConversation(response.data);
      })
      .catch((error) =>
        console.error("Error creating new conversation:", error)
      );
  };
  const onDeleteConversation = async (conversationId) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/conversations/delete`, {
        conversationId: conversationId,
      });
      if (!res) {
        console.log(res.data);
      }
      getAllConversations();
      setSelectedConversation(null);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSendMessage = async (conversationId, message) => {
    const token = localStorage.getItem("token");
    setLoading(true);
    console.log(conversationId);
    console.log(message);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/conversations/id/message`,
        {
          conversation_id: conversationId,
          message: message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSelectedConversation(response.data);
      setConversations(
        conversations.map((conv) =>
          conv._id === response.data._id ? response.data : conv
        )
      );
      const chatHistory = selectedConversation.messages.map((message) => {
        let saidBy = "Bot";
        if (message.bool) saidBy = "User";
        return `${saidBy}: ${message.msg}`;
      }).join('\n');
      const ai_response = await axios.post(`${ML_URL}/query_pdf/`, {
        file_name: selectedConversation.from_pdf,
        question: message.msg,
        conversation_history: chatHistory,
      });
      console.log(ai_response);
      const response2 = await axios.post(
        `${BACKEND_URL}/conversations/id/message`,
        {
          conversation_id: conversationId,
          message: { msg: ai_response.data.answer, bool: false },
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSelectedConversation(response2.data);
      setConversations(
        conversations.map((conv) =>
          conv._id === response2.data._id ? response2.data : conv
        )
      );
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="flex flex-grow bg-white h-full w-full overflow-y-hidden">
    //   <div
    //     className="h-full overflow-auto overflow-x-hidden scrollbar-hide min-w-[330px]"
    //     style={{ width: chatListWidth }}
    //   >
    //     <ChatList
    //       buttonOnClick={handleNewChat}
    //       conversations={conversations}
    //       onSelectConversation={handleSelectConversation}
    //       selectedConversation={selectedConversation}
    //     />
    //   </div>
    //   <div
    //     ref={dividerRef}
    //     className="w-1 cursor-col-resize bg-transparent"
    //     onMouseDown={handleMouseDown}
    //   />
    //   <div className="flex-1 h-full scrollbar-hide">
    //     <ChatContent
    //       conversation={selectedConversation}
    //       onSendMessage={handleSendMessage}
    //       newChat={handleNewChat}
    //       loading={loading}
    //     />
    //   </div>
    // </div>
    <div className="flex flex-grow bg-white h-full w-full overflow-hidden">
      <div
        className="h-full overflow-auto overflow-x-hidden scrollbar-hide min-w-[330px]"
        style={{ width: chatListWidth }}
      >
        <ChatList
          buttonOnClick={handleNewChat}
          conversations={conversations}
          onSelectConversation={handleSelectConversation}
          selectedConversation={selectedConversation}
          files={files}
          onDeleteConversation={onDeleteConversation}
        />
      </div>
      <div
        ref={dividerRef}
        className="w-1 cursor-col-resize bg-transparent"
        onMouseDown={handleMouseDown}
      />
      <div className="flex-1 h-full scrollbar-hide">
        <ChatContent
          conversation={selectedConversation}
          onSendMessage={handleSendMessage}
          newChat={handleNewChat}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default ChatBody;
