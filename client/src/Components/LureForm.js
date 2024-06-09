//Imports
import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

//Variables
const endpoint = 'http://localhost:5000/api/lures';

//The form
const LureForm = ({ onLureAdded }) => {
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submitting:', name); // Debugging log

    const formData = new FormData();
    formData.append('typeOfLure', name);
    formData.append('lureImage', file);

    try {
      const response = await fetch(endpoint, { 
        method: 'POST',
        body: formData,
      });
      console.log('Response:', response); // Debugging log
      if (response.ok) {
        const data = await response.json();
        console.log('Lure created:', data); // Debugging log
        onLureAdded();
        //clear form
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
    <Box m={10} component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h6" sx={{ mt: 5 }}>Create Lure</Typography>
      <TextField 
        label="Enter lure name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="file"
        id="fileInput"
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept="image/*"
        required
      />
      <Button sx={{ width: '25%', alignSelf: 'center' }}
        variant="contained"
        color="primary"
        onClick={handleButtonClick}
      >
        Choose File
      </Button>
      {file && <Typography variant="body2">{file.name}</Typography>}
      <Button type="submit" variant="contained" color="primary" sx={{ width: '25%', alignSelf: 'center' }}>
        Submit
      </Button>
    </Box>
  );
};

export default LureForm;
