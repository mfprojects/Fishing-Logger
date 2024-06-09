import React, { useState, useEffect } from 'react';

const LureList = ({ refresh }) => {
  const [lures, setLures] = useState([]);
  const [error, setError] = useState(null);

  const fetchLures = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/lures'); // Ensure correct URL
      if (!response.ok) {
        throw new Error('Failed to fetch lures');
      }
      const data = await response.json();
      setLures(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (refresh) {
      fetchLures();
    }
  }, [refresh]);

  return (
    <div>
      <button onClick={fetchLures}>Show Lures</button>
      {error && <p>{error}</p>}
      <ul>
        {lures.map((lure) => (
          <li key={lure.id}>
            <p>Type: {lure.typeOfLure}</p>
            <img 
              src={`http://localhost:5000/${lure.lureImagePath}`} 
              alt={lure.typeOfLure} 
              width="100" 
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LureList;
