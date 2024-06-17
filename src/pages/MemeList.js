// src/pages/MemeList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardMedia, CardContent, Typography, Grid, Button, CircularProgress, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const MemeList = () => {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8001/api/memes/');
        setMemes(response.data);
      } catch (error) {
        enqueueSnackbar('Error fetching memes', { variant: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchMemes();
  }, [enqueueSnackbar]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8001/api/memes/${id}/`);
      setMemes(memes.filter((meme) => meme.id !== id));
      enqueueSnackbar('Meme deleted successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Error deleting meme', { variant: 'error' });
    }
  };

  if (loading) {
    return <Box display="flex" justifyContent="center" mt={4}><CircularProgress /></Box>;
  }

  if (memes.length === 0) {
    return <Typography variant="h6" align="center">No memes available</Typography>;
  }

  return (
    <Grid container spacing={3}>
      {memes.map((meme) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={meme.id}>
          <Card>
            <CardMedia component="img" image={meme.image} alt={meme.title} />
            <CardContent>
              <Typography variant="h6">{meme.title}</Typography>
              <Typography variant="body2">{meme.description}</Typography>
              <Button onClick={() => navigate(`/edit-meme/${meme.id}`)}>Edit</Button>
              <Button onClick={() => handleDelete(meme.id)}>Delete</Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default MemeList;
