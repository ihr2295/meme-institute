// src/pages/Dashboard.js
import React from 'react';
import { Grid, Card, Typography, Box } from '@mui/material';
import { useMemes } from '../context/MemeContext';
import MemeForm from '../components/MemeForm';

const Dashboard = () => {
  const { state } = useMemes();

  return (
    <Box p={2}>
      <MemeForm />
      <Grid container spacing={2}>
        {state.memes.map(meme => (
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
