// src/pages/AddMeme.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';

const AddMeme = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);

    try {
      await axios.post('http://127.0.0.1:8001/api/memes/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      enqueueSnackbar('Meme added successfully', { variant: 'success' });
      navigate('/memes');
    } catch (error) {
      enqueueSnackbar('Failed to add meme', { variant: 'error' });
    }
  };

  return (
    <Box>
      <Typography variant="h4">Add Meme</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          required
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Add Meme
        </Button>
      </form>
    </Box>
  );
};

export default AddMeme;
