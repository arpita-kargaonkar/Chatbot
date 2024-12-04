import mongoose from "mongoose";
import Conversation from "../models/Conversation.js";

export const saveConversation = async (req, res) => {
  console.log("Inside Save Conversation");
  try {
    const user_id = req.body.user_id;
    const from_pdf = req.body.pdfName;
    console.log(user_id);
    const newConversation = new Conversation({
      user_id,
      from_pdf,
    });
    await newConversation.save();
    res.status(201).json(newConversation);
  } catch (e) {
    res.status(501).json({ error: e.message });
  }
};

export const getAllConversations = async (req, res) => {
  console.log("inside GetAllConversation function");
  try {
    const user_id = req.query.user_id;
    // console.log(req.body);
    const allConversations = await Conversation.find({ user_id: user_id });
    res.status(201).json(allConversations);
  } catch (e) {
    res.status(501).json({ error: e.message });
  }
};

export const getConversationById = async (req, res) => {
  console.log("Inside getConversationById Function");
  try {
    const conversation_id = req.query.conversation_id;
    if (!mongoose.Types.ObjectId.isValid(conversation_id)) {
      return res.status(400).send("Invalid conversation ID");
    }
    const conversation = await Conversation.findOne({ _id: conversation_id });
    if (!conversation) {
      return res.status(404).send("Conversation not found");
    }
    res.status(201).json(conversation);
  } catch (e) {
    res.status(501).json({ error: e.message });
  }
};

export const updateConversation = async (req, res) => {
  console.log("Inside updateConversation function.");
  try {
    const conversation_id = req.body.conversation_id;
    const message = req.body.message;
    const updatedConversation = await Conversation.findByIdAndUpdate(
      conversation_id,
      { $push: { messages: message } },
      { new: true } // This option returns the updated document
    );

    if (!updatedConversation) {
      return res.status(404).send("Conversation not found");
    }
    if (updatedConversation.messages.length === 1) {
      // console.log(req.body.msg);
      // try {
      //   const title = await axios.post(`http://0.0.0.0:8000/name/`, {
      //     question: req.body.msg,
      //   });
      //   console.log(title);
      //   updatedConversation.name = title.data.output;
      //   await updatedConversation.save();
      // } catch (e) {
      //   console.log(e.message);
      // }
      updatedConversation.name = message.msg;
      await updatedConversation.save();
    }
    res.send(updatedConversation);
  } catch (e) {
    res.status(501).json({ error: e.message });
  }
};

export const deleteConversation = async (req, res) => {
  console.log("inside deleteConversation function");
  try {
    const id = req.body.conversationId;
    const response = await Conversation.findOneAndDelete({ _id: id });
    if (response) {
      res.status(201).send("deleted");
    } else {
      res.status(401).send("something went wrong while deleting");
    }
  } catch (error) {
    console.log(error);
  }
};
