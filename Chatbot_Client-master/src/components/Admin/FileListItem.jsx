import React from 'react';
import { ListItem, ListItemIcon, ListItemText, Paper } from '@mui/material';
import { PictureAsPdf } from '@mui/icons-material';

const FileListItem = ({ file, onFileSelect }) => {
    console.log(file);
  return (
    <Paper elevation={2} className="mb-2">
      <ListItem button onClick={() => onFileSelect(file)} className="rounded-lg hover:bg-gray-100 transition duration-200">
        <ListItemIcon>
          <PictureAsPdf color="primary" />
        </ListItemIcon>
        <ListItemText primary={file} className="text-gray-700" />
      </ListItem>
    </Paper>
  );
};

export default FileListItem;
