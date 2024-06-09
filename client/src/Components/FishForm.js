//Imports
import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

//Variables
const endpoint = 'http://localhost:5000/api/fish';

//The form
const FishForm = ({ onFishAdded }) => {
  const [type, setType] = useState('');
  const [size, setSize] = useState('');
  const [weight, setWeight] = useState('');
  const [lure, setLure] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submitting:', type, size, weight, lure); // Debugging log

    const formData = new FormData();
    formData.append('typeOfFish', type);
    formData.append('size', size);
    formData.append('weight', weight);
    formData.append('lure', lure);
    formData.append('fishImage', file);

    try {
      const response = await fetch(endpoint, { 
        method: 'POST',
        body: formData,
      });
      console.log('Response:', response); // Debugging log
      if (response.ok) {
        const data = await response.json();
        console.log('Fish created:', data); // Debugging log
        onFishAdded();
        //clear form
        setType('');
        setSize('');
        setWeight('');
        setLure('');
        setFile(null);
      } else {
        console.error('Failed to create fish:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleButtonClick = () => {
    document.getElementById('fishFileInput').click();
  };

  return (
    <Box m={10} component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h6" sx={{ mt: 5 }}>Create Fish</Typography>
      <TextField 
        label="Enter Fish type"
        variant="outlined"
        value={type}
        onChange={(e) => setType(e.target.value)}
        required
      />
        <TextField 
        label="Enter Fish size"
        variant="outlined"
        value={size}
        onChange={(e) => setSize(e.target.value)}
        required
      />
        <TextField 
        label="Enter Fish weight"
        variant="outlined"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        required
      />
        <TextField 
        label="Enter Fish lure"
        variant="outlined"
        value={lure}
        onChange={(e) => setLure(e.target.value)}
        required
      />
      <input
        type="file"
        id="fishFileInput"
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

export default FishForm;
