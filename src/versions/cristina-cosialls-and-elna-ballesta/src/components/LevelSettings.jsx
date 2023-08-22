import React from 'react';
import '../style/LevelSettings.css';

function LevelSettings({ changeGameLevel }) {
  return (
    <section className='level-settings'> 
      <button className='level' onClick={() => { changeGameLevel('Easy') }}>Easy</button>
      <button className='level' onClick={() => { changeGameLevel('Intermediate') }}>Intermediate</button>
      <button className='level' onClick={() => { changeGameLevel('Expert') }}>Expert</button>
    </section>
  );
}

export default LevelSettings;
