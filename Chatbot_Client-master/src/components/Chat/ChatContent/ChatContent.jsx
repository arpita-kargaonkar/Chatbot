// ChatContent.js

// import React, { useEffect, useRef, useState } from "react";
// import ChatItem from "./ChatItem";
// import SendIcon from "@mui/icons-material/Send";
// import Navbar from "../../Navbar/Navbar";

// function ChatContent({ conversation, onSendMessage, newChat, loading }) {
//   const [query, setQuery] = useState("");
//   const scrollableDivRef = useRef(null);

//   const scrollToBottom = () => {
//     if (scrollableDivRef.current) {
//       scrollableDivRef.current.scrollTop =
//         scrollableDivRef.current.scrollHeight;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (query === "") return;
//     if (!conversation) {
//       newChat();
//     } else {
//       onSendMessage(conversation._id, { bool: true, msg: query });
//       setQuery("");
//     }
//   };

//   const handleChangeQuery = (e) => {
//     setQuery(e.target.value);
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [conversation]);

//   const handleKeyDown = (event) => {
//     if (event.key === "Enter" || event.keyCode === 13) {
//       handleSubmit(event);
//     }
//   };

//   return (
//     <>
//       <Navbar />

//       <div className="flex-grow p-4 bg-gray-100 h-full">
//         <div className="h-4/5 flex flex-col-reverse overflow-y-auto scrollbar-hide overflow-x-hidden">
//           <div className="flex-grow pb-4" ref={scrollableDivRef}>
//             {conversation &&
//               conversation.messages.map((itm, index) => (
//                 <ChatItem
//                   key={index}
//                   animationDelay={1}
//                   user={itm.bool ? "" : "other"}
//                   msg={itm.msg}
//                 />
//               ))}
//           </div>
//           {loading && (
//             <div className="flex justify-center py-2">
//               <div className="w-3 h-3 rounded-full bg-gray-700 mr-1 animate-ping"></div>
//               <div className="w-3 h-3 rounded-full bg-gray-700 mr-1 animate-ping400"></div>
//               <div className="w-3 h-3 rounded-full bg-gray-700 animate-ping800"></div>
//             </div>
//           )}
//         </div>
//         <div className="flex items-center justify-between mt-4">
//           <input
//             type="text"
//             className="flex-grow px-4 py-3 my-4 bg-white border border-gray-300 rounded-lg outline-none focus:border-blue-500"
//             placeholder="Type a message here"
//             value={query}
//             onChange={handleChangeQuery}
//             onKeyDown={handleKeyDown}
//           />
//           <button
//             className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
//             onClick={handleSubmit}
//           >
//             <SendIcon />
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

// export default ChatContent;

// src/components/ChatContent.js
import React, { useEffect, useRef, useState } from "react";
import ChatItem from "./ChatItem";
import SendIcon from "@mui/icons-material/Send";
import Navbar from "../../Navbar/Navbar";
import WelcomeMessage from "./WelcomeMessage";

function ChatContent({ conversation, onSendMessage, newChat, loading }) {
  const [query, setQuery] = useState("");
  const scrollableDivRef = useRef(null);

  const scrollToBottom = () => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTop =
        scrollableDivRef.current.scrollHeight;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query === "") return;
    if (!conversation) {
      newChat();
    } else {
      onSendMessage(conversation._id, { bool: true, msg: query });
      setQuery("");
    }
  };

  const handleChangeQuery = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      handleSubmit(event);
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex-grow p-4 bg-gray-100 h-full relative">
        {conversation ? (
          <div className="h-4/5 flex flex-col-reverse overflow-y-auto scrollbar-hide overflow-x-hidden">
            <div className="flex-grow pb-4" ref={scrollableDivRef}>
              {conversation.messages.map((itm, index) => (
                <ChatItem
                  key={index}
                  animationDelay={1}
                  user={itm.bool ? "" : "other"}
                  msg={itm.msg}
                />
              ))}
              {loading && (
                <div className="absolute mb-4 ml-4 flex">
                  <div className="w-3 h-3 rounded-full bg-gray-700 animate-ping"></div>
                  <div
                    className="w-3 h-3 rounded-full bg-gray-700 animate-ping"
                    style={{ animationDelay: "-0.32s" }}
                  ></div>
                  <div
                    className="w-3 h-3 rounded-full bg-gray-700 animate-ping"
                    style={{ animationDelay: "-0.16s" }}
                  ></div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <WelcomeMessage />
        )}

        {conversation && (
          <div className="flex items-center justify-between mt-4">
            <input
              type="text"
              className="flex-grow px-4 py-3 my-4 bg-white border border-gray-300 rounded-lg outline-none focus:border-blue-500"
              placeholder="Type a message here"
              value={query}
              onChange={handleChangeQuery}
              onKeyDown={handleKeyDown}
            />
            <button
              className="ml-2 px-4 py-2 bg-[#1d4ed8] text-white rounded-lg hover:bg-[#1e40af] focus:outline-none"
              onClick={handleSubmit}
            >
              <SendIcon />
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default ChatContent;
