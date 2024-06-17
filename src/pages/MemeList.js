// src/pages/MemeList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardMedia, CardContent, Typography, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MemeList = () => {
  const [memes, setMemes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMemes = async () => {
      const response = await axios.get('http://127.0.0.1:8001/api/memes/');
      setMemes(response.data);
    };

    fetchMemes();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://127.0.0.1:8001/api/memes/${id}/`);
    setMemes(memes.filter((meme) => meme.id !== id));
  };

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
