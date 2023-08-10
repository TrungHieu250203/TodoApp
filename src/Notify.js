import React from 'react';
import './Notify.css';

function Notify({ icon, text }) {
  return (
    <div className={`notify ${icon}`}>
      {text}
    </div>
  );
}

export default Notify;