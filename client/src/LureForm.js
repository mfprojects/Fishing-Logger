import React, { useState } from 'react';

const LureForm = ({onLureAdded}) => {
  const [name, setName] = useState('');
  const [file, setFile]= useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submitting:', name); // Debugging log
   
    const formData = new FormData();
    formData.append('typeOfLure', name);
    formData.append('lureImage', file);
   
   
    try {
      const response = await fetch('http://localhost:5000/api/lures', { // Ensure correct URL
        method: 'POST',
        body: formData,
      });
      console.log('Response:', response); // Debugging log
      if (response.ok) {
        const data = await response.json();
        console.log('Lure created:', data); // Debugging log
        onLureAdded();
      } else {
        console.error('Failed to create lure:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter lure name"
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        />
      <button type="submit">Submit</button>
    </form>
  );
};

export default LureForm;
