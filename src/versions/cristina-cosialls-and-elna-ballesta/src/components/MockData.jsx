import React, { useState } from 'react';
import '../style/MockData.css';

function MockData({ getMockData }) {
    const [inputText, setInputText] = useState('')

    const handleChange = (event) => {
      setInputText(event.target.value)
    };
  
    const handleClick = () => {
      getMockData(inputText)
    };
  

    return (
        <div className='mockData-container'>
            <textarea className='mockData-textarea' data-testid='mockDataLoader-textarea' autoFocus onChange={handleChange} value={inputText}/>
            <button data-testid='mockDataLoader-loadButton' onClick={handleClick}>Crear</button>
        </div>
    )
}

export default MockData;