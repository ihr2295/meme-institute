// src/components/MemeForm.js
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { createMeme } from '../api';
import { useMemes } from '../context/MemeContext';

const MemeForm = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const { dispatch } = useMemes();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);

    const response = await createMeme(formData);
    dispatch({ type: 'ADD_MEME', payload: response.data });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        required
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Create Meme
      </Button>
    </Box>
  );
};

export default MemeForm;
