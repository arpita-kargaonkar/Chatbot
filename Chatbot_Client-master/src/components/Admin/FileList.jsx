import React from 'react';
import { List, Paper, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { PictureAsPdf } from '@mui/icons-material';
import FileListItem from './FileListItem';

const FileList = ({ files, onFileSelect }) => {
const stringFiles = files.filter(file => typeof file === 'string');
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Available PDFs:</h2>
      <List>
        {stringFiles.map((file, index) => (
          <FileListItem key={index} file={file} onFileSelect={onFileSelect} />
        ))}
      </List>
    </div>
  );
};

export default FileList;
