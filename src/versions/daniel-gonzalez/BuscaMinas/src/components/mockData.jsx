import React, { useState, useEffect } from 'react';

function MockDataLoader({ onSubmit }) {
  const [showForm, setShowForm] = useState(false);
  const [mockData, setMockData] = useState('');

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 'm') {
        setShowForm((showForm) => !showForm);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(mockData);
    setMockData('');
    setShowForm(false);
  };

  return (
    <>
      {showForm && (
        <form onSubmit={handleSubmit}>
            <p>Mock Data: </p>
          <label>
            <textarea
              value={mockData}
              onChange={(event) => setMockData(event.target.value)}
            />
          </label>
          <div>
          <button className='mock-submit' type="submit">Submit</button>
          </div>
        </form>
      )}
    </>
  );
}

export default MockDataLoader;