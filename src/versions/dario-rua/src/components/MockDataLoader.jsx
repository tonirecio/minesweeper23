/* eslint-disable */
import React, { useState, useEffect } from 'react';

export function MockDataLoader({ onSubmit }) {
  const [mockData, setMockData] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(mockData);
    setMockData("");

  };

  return (
    <>
      
      <form onSubmit={handleSubmit}>
          <h1 className='subtitle'>Mock Data: </h1>
        <label>
          <textarea
            value={mockData}
            onChange={(event) => setMockData(event.target.value)}
            data-testid='mockData-text'
          />
        </label>
        <div>
        <button 
          className='mockData-submit' 
          type="submit" 
          data-testid="mockData-submit"
        >
          Submit
        </button>
        </div>
      </form>
      
    </>
  );
}

export default MockDataLoader;