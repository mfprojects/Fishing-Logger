// LureForm.js

import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Card, CardContent } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

const endpoint = 'http://localhost:5000/api/lures';

const LureForm = ({ onLureAdded }) => {
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('typeOfLure', name);
    formData.append('lureImage', file);

    try {
      const response = await fetch(endpoint, { 
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Lure created:', data);  // Log the data
        onLureAdded();
        setName('');
        setFile(null);
      } else {
        console.error('Failed to create lure:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleButtonClick = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <Card sx={{ maxWidth: 500, margin: 'auto', mt: 10, backgroundColor: 'transparent' }}>
      <CardContent>
        <Typography variant="h4" component="div" gutterBottom>
          Lure Stats
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField 
            label="Enter lure name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
          />
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            onChange={handleFileChange}
            accept="image/*"
            required
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleButtonClick}
            startIcon={<CloudUpload />}
            fullWidth
          >
            Choose File
          </Button>
          {file && <Typography variant="body2" sx={{ mt: 1 }}>{file.name}</Typography>}
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LureForm;
