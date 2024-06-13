// FishForm.js

import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Card, CardContent, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import DateTimePickerComponent from './DateTimePickerComponent';

const endpoint = 'http://localhost:5000/api/fish';
const luresEndpoint = 'http://localhost:5000/api/lures';

const CatchForm = ({ onCatchAdded }) => {
  const [type, setType] = useState('');
  const [size, setSize] = useState('');
  const [weight, setWeight] = useState('');
  const [lure_id, setLureId] = useState('');
  const [lures, setLures] = useState([]);
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [file, setFile] = useState(null);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submitting:', type, size, weight, lure_id, selectedDateTime); // Debugging log

    const formData = new FormData();
    formData.append('typeOfFish', type);
    formData.append('size', size);
    formData.append('weight', weight);
    formData.append('lure_id', lure_id);
    formData.append('catchDateTime', selectedDateTime.toISOString());
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
        onCatchAdded();
        // Clear form
        setType('');
        setSize('');
        setWeight('');
        setLureId('');
        setSelectedDateTime(new Date());
        setFile(null);
      } else {
        console.error('Failed to create catch:', response.statusText);
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
    <Card sx={{ maxWidth: 500, margin: 'auto', mt: 10 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Add a catch
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField 
            label="Enter Fish type"
            variant="outlined"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            fullWidth
          />
          <TextField 
            label="Enter Fish size"
            variant="outlined"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            required
            fullWidth
          />
          <TextField 
            label="Enter Fish weight"
            variant="outlined"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
            fullWidth
          />
          <FormControl variant="outlined" required fullWidth>
            <InputLabel id="lure-label">Select Lure</InputLabel>
            <Select
              label="Select Lure"
              labelId="lure-label"
              id="lure"
              value={lure_id}
              onChange={(e) => setLureId(e.target.value)}
            >
              {lures.map((lure) => (
                <MenuItem key={lure.id} value={lure.id}>{lure.typeOfLure}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <div>
            <DateTimePickerComponent value={selectedDateTime} onChange={setSelectedDateTime} />
          </div>
          <input
            type="file"
            id="fishFileInput"
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

export default CatchForm;
