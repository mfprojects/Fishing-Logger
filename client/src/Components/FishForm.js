//Imports
import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import DateTimePickerComponent from './DateTimePickerComponent';

//Variables
const endpoint = 'http://localhost:5000/api/fish';
const luresEndpoint = 'http://localhost:5000/api/lures';

//The form
const FishForm = ({ onFishAdded }) => {
  const [type, setType] = useState('');
  const [size, setSize] = useState('');
  const [weight, setWeight] = useState('');
  const [lure_id, setLureId] = useState(''); // The lure ID chosen
  const [lures, setLures] = useState([]); // List of lures
  const [file, setFile] = useState(null);

// Fetch lures when component mounts
useEffect(() => {
    const fetchLures = async () => {
    try {
        const response = await fetch(luresEndpoint);
        const data = await response.json();
        setLures(data);
    } catch (error) {
        console.error('Error fetching lures:', error);
    }
    };
    fetchLures();
}, []);

//Handlers
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submitting:', type, size, weight, lure_id); // Debugging log

    const formData = new FormData();
    formData.append('typeOfFish', type);
    formData.append('size', size);
    formData.append('weight', weight);
    formData.append('lure_id', lure_id);
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
        setLureId('');
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

  const [selectedDateTime, setSelectedDateTime] = useState(new Date());

  useEffect(() => {
    // Prefill with the current date and time
    setSelectedDateTime(new Date());
  }, []);

  const handleDateTimeChange = (newValue) => {
    setSelectedDateTime(newValue);
  };

  //Rendering
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
        <FormControl variant="outlined" required>
        <InputLabel id="lure-label">Select Lure</InputLabel>
        <Select
          labelId="lure-label"
          id="lure"
          value={lure_id}
          onChange={(e) => setLureId(e.target.value)}
          label="Select Lure"
        >
            
          {lures.map((lure) => (
            <MenuItem key={lure.id} value={lure.id}>{lure.typeOfLure}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <div>
        <DateTimePickerComponent value={selectedDateTime} onChange={handleDateTimeChange} />
      </div>

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
