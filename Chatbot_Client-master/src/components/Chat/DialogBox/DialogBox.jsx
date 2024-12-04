import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { styled } from "@mui/system";

const CustomDialog = styled(Dialog)({
  "& .MuiDialog-paper": {
    borderRadius: "0.75rem",
    padding: "1.5rem",
    maxWidth: "600px",
    width: "100%",
  },
});

const NewChatDialog = ({ open, handleClose, handleNewChat, files }) => {
  const stringFiles = files.filter((file) => typeof file === "string");
  const [selectedPdf, setSelectedPdf] = useState("");
  const [error, setError] = useState("");

  const handleStartConversation = () => {
    if (!selectedPdf) {
      setError("Please select a PDF to start a conversation.");
      return;
    }
    handleNewChat(selectedPdf);
    handleClose();
  };

  return (
    <CustomDialog open={open} onClose={handleClose}>
      <DialogTitle className="bg-gradient-to-r from-[#1e3a8a] to-[#1d4ed8] text-white p-4 rounded-t-lg font-bold">
        Start New Conversation
      </DialogTitle>
      <DialogContent className="pt-6 pb-6">
        <FormControl fullWidth className="my-4">
          <InputLabel id="pdf-select-label">Select PDF</InputLabel>
          <Select
            labelId="pdf-select-label"
            value={selectedPdf}
            onChange={(e) => setSelectedPdf(e.target.value)}
            className="border-2 border-gray-300 rounded-md mt-4"
            MenuProps={{ anchorOrigin: { vertical: "bottom", horizontal: "left" }, transformOrigin: { vertical: "top", horizontal: "left" }, getContentAnchorEl: null }}
          >
            {stringFiles.map((file, index) => (
              <MenuItem key={index} value={file}>
                {file}
              </MenuItem>
            ))}
          </Select>
          {error && <FormHelperText error>{error}</FormHelperText>}
        </FormControl>
      </DialogContent>
      <DialogActions className="p-4">
        <Button
          onClick={handleClose}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
        >
          Cancel
        </Button>
        <Button
          onClick={handleStartConversation}
          className="bg-gradient-to-r from-[#1e3a8a] to-[#1d4ed8] text-white px-4 py-2 rounded-md hover:from-[#1e40af] hover:to-[#1d4ed8] transition-colors"
        >
          <div className="text-white">Start Conversation</div>
        </Button>
      </DialogActions>
    </CustomDialog>
  );
};

export default NewChatDialog;
