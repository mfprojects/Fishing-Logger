import React, { useState } from 'react';

const LureForm = () => {
  const [name, setName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitting:", name)

    try {
      const response = await fetch('/api/lures', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });
      console.log("Response:", response)
      if (response.ok) {
        const data = await response.json();
        console.log("Lure Created", data); // Log the newly created lure
      } else {
        console.error('Failed to create lure:', response.statusText);
      }

      // Reset form fields or display a success message
      //setName(''); // Reset the name field
    } catch (error) {
      console.error('Error creating lure:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Lure Name"
      />
      <button type="submit">Create Lure</button>
    </form>
  );
};

export default LureForm;
