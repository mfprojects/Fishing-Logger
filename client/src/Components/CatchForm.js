import React, { useState, useEffect } from 'react';
import { TextField, Button, Slider, Box, Typography, Card, CardContent, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import DateTimePickerComponent from './DateTimePickerComponent';
import LeafletMap from './LeafletMap';

const endpoint = 'http://localhost:5000/api/catch';
const fishEndpoint = 'http://localhost:5000/api/fish';
const luresEndpoint = 'http://localhost:5000/api/lures';

const CatchForm = ({ onCatchAdded }) => {
  const [fish_id, setFishId] = useState('');
  const [fish, setFish] = useState([]);
  const [size, setSize] = useState(1);
  const [weight, setWeight] = useState(1);
  const [lure_id, setLureId] = useState('');
  const [lures, setLures] = useState([]);
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [file, setFile] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [locationName, setLocationName] = useState("");

  useEffect(() => {
    const fetchLures = async () => {
      try {
        const response = await fetch(luresEndpoint);
        const data = await response.json();
        console.log('Lure data:', data);
        setLures(data);
      } catch (error) {
        console.error('Error fetching lures:', error);
      }
    };
    fetchLures();
  }, []);

  useEffect(() => {
    const fetchFish = async () => {
      try {
        const response = await fetch(fishEndpoint);
        const data = await response.json();
        console.log('Fish data:', data);
        setFish(data);
      } catch (error) {
        console.error('Error fetching fish:', error);
      }
    };
    fetchFish();
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleButtonClick = () => {
    document.getElementById('fishFileInput').click();
  };

  const handlePositionChange = (position) => {
    setLatitude(position[0]);
    setLongitude(position[1]);
    setLocationName(position[2]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submitting:', fish_id, size, weight, lure_id, selectedDateTime, latitude, longitude, locationName);

    const formData = new FormData();
    formData.append('fish_id', fish_id);
    formData.append('size', size);
    formData.append('weight', weight);
    formData.append('lure_id', lure_id);
    formData.append('catchDateTime', selectedDateTime.toISOString());
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);
    formData.append('locationName', locationName); // Add location name to the form data
    formData.append('fishImage', file);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });
      console.log('Response:', response);
      if (response.ok) {
        const data = await response.json();
        console.log('Catch created:', data);
        onCatchAdded();
        // Clear form
        setFishId('');
        setSize(1);
        setWeight(1);
        setLureId('');
        setSelectedDateTime(new Date());
        setFile(null);
        setLatitude(null);
        setLongitude(null);
        setLocationName('');
      } else {
        console.error('Failed to create catch:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Card size="lg" sx={{ margin: 'auto', mt: 10 }}>
      <CardContent>
        <Typography variant="h5" component="div" mb="1em">
          Location
        </Typography>
        <Box sx={{ width: '100%' }}>
            <LeafletMap onPositionChange={handlePositionChange} />
        </Box>
        <Typography variant="h5" component="div" mb="1em" mt="1em">
          Fish Stats
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          <Box sx={{ width: '100%', maxWidth: '600px' }}>
            <FormControl variant="outlined" required fullWidth>
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
          </Box>

          <Box sx={{ width: '100%', maxWidth: '600px' }}>
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
              fullWidth
            />
          </Box>

          <Box sx={{ width: '100%', maxWidth: '600px' }}>
            <TextField
              label="Fish weight(grams)"
              variant="outlined"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
              fullWidth
            />
          </Box>

          <Box sx={{ width: '100%', maxWidth: '600px' }}>
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
          </Box>

          <Box sx={{ width: '100%', maxWidth: '600px' }}>
            <DateTimePickerComponent value={selectedDateTime} onChange={setSelectedDateTime} />
          </Box>

          <Box sx={{ width: '100%', maxWidth: '600px' }}>
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
          </Box>

          {file && <Typography variant="body2" sx={{ mt: 1 }}>{file.name}</Typography>}

          <Box sx={{ width: '100%', maxWidth: '600px' }}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CatchForm;
