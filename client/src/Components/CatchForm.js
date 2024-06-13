import React, { useState, useEffect } from 'react';
import { TextField, Button, Slider, Box, Typography, Card, CardContent, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import DateTimePickerComponent from './DateTimePickerComponent';
import LeafletMap from './LeafletMap';

const endpoint = 'http://localhost:5000/api/catch';
const fishEndpoint = 'http://localhost:5000/api/fish';
const luresEndpoint = 'http://localhost:5000/api/lures';

//Define Form
const CatchForm = ({ onCatchAdded }) => {
  const [fish_id, setFishId] = useState('');
  const [fish, setFish] = useState([]);
  const [size, setSize] = useState(1);
  const [weight, setWeight] = useState(1);
  const [lure_id, setLureId] = useState('');
  const [lures, setLures] = useState([]);
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [file, setFile] = useState(null);

  //Fetch data outside of react for lures
  useEffect(() => {
    const fetchLures = async () => {
      try {
        const response = await fetch(luresEndpoint);
        const data = await response.json();
        console.log('Lure data:', data); // Debugging log
        setLures(data);
      } catch (error) {
        console.error('Error fetching lures:', error);
      }
    };
    fetchLures();
  }, []);

  //Fetch data ouutside of react for fish
  useEffect(() => {
    const fetchFish = async () => {
      try {
        const response = await fetch(fishEndpoint);
        const data = await response.json();
        console.log('Fish data:', data); // Debugging log
        setFish(data);
      } catch (error) {
        console.error('Error fetching fish:', error);
      }
    };
    fetchFish();
  }, []);

  //Event Handlers begin
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleButtonClick = () => {
    document.getElementById('fishFileInput').click();
  };
  //Event Handlers end

  //Submit Form
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submitting:', fish_id, size, weight, lure_id, selectedDateTime); // Debugging log

    const formData = new FormData();
    formData.append('fish_id', fish_id);
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
        setFishId('');
        setSize(1);
        setWeight(1);
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

  //Update VDOM
  return (
    <Card size ="lg" sx={{ margin: 'auto', mt: 10 }}>
      <CardContent>
        <Typography variant="h5" component="div" mb="1em">
          Fish stats
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <FormControl variant="outlined" required>
            <InputLabel id="fish-label">Select Fish</InputLabel>
            <Select
              label="Select Fish"
              labelId="fish-label"
              id="fish"
              value={fish_id}
              onChange={(e) => setFishId(e.target.value)}
            >
              {fish.map((fish) => (
                <MenuItem key={fish.id} value={fish.id}>{fish.typeOfFish}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography>
            Size: {size}cm
          </Typography>
          <Slider
            defaultValue={1}
            min={1}
            max={200}
            aria-label='Default'
            valueLabelDisplay='auto'
            value={size}
            onChange={(e) => setSize(e.target.value)}
            required
          />
          <TextField 
            label="Fish weight(grams)"
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
          >
            Choose File
          </Button>
          <Box maxWidth={"100%"} maxHeight={"100%"}>
          <LeafletMap></LeafletMap>
          </Box>
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
