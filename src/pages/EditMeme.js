// src/pages/EditMeme.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material';
import { useSnackbar } from 'notistack';

const EditMeme = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeme = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8001/api/memes/${id}/`);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setImage(response.data.image);
      } catch (error) {
        enqueueSnackbar('Error fetching meme data', { variant: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchMeme();
  }, [id, enqueueSnackbar]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (image instanceof File) {
      formData.append('image', image);
    }

    try {
      await axios.put(`http://127.0.0.1:8001/api/memes/${id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      enqueueSnackbar('Meme updated successfully', { variant: 'success' });
      navigate('/memes');
    } catch (error) {
      enqueueSnackbar('Failed to update meme', { variant: 'error' });
    }
  };

  if (loading) {
    return <Box display="flex" justifyContent="center" mt={4}><CircularProgress /></Box>;
  }

  return (
    <Box>
      <Typography variant="h4">Edit Meme</Typography>
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
        />
        <Button type="submit" variant="contained" color="primary">
          Save Changes
        </Button>
      </form>
    </Box>
  );
};

export default EditMeme;
