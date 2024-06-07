import React, { useState } from 'react';

const LureForm = () => {
  const [name, setName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submitting:', name); // Debugging log
    try {
      const response = await fetch('http://localhost:5000/api/lures', { // Ensure correct URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ typeOfLure: name }), // Correct body structure
      });
      console.log('Response:', response); // Debugging log
      if (response.ok) {
        const data = await response.json();
        console.log('Lure created:', data); // Debugging log
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
      <button type="submit">Submit</button>
    </form>
  );
};

export default LureForm;
