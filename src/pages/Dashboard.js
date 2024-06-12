// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { fetchMemes } from '../api';
import { Grid, Card, Typography, Box } from '@mui/material';

const Dashboard = () => {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    fetchMemes().then(response => setMemes(response.data));
  }, []);

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        {memes.map(meme => (
          <Grid item xs={12} md={6} lg={4} key={meme.id}>
            <Card>
              <Typography variant="h5">{meme.title}</Typography>
              {/* Add more content based on the image */}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
