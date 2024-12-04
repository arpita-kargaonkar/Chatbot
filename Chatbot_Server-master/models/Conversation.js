import { Schema, model } from "mongoose";

const conversationSchema = Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    messages: {
      type: Array,
      default: [],
    },
    name: {
      type: String,
      default: "New Chat",
    },
    from_pdf: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Conversation = model("Conversation", conversationSchema);

export default Conversation;
