// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
// eslint-disable-next-line react/prop-types
function MockDataLoader({ onSubmit }) {
  const [mockData, setMockData] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(mockData);
    setMockData("");
  };

  return (
    <form onSubmit={handleSubmit} data-testid="mockDataLoader-form">
      <p>Mock Data:</p>
      <label>
        <textarea
          value={mockData}
          onChange={(event) => setMockData(event.target.value)}
          data-testid="mockDataLoader-textarea"
        />
      </label>
      <div>
        <button
          className="mock-submit"
          type="submit"
          data-testid="mockDataLoader-loadButton"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default MockDataLoader;
