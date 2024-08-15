// src/SelectedSubject.js

import React from 'react';
import './SelectedSubject.css'; // Import the CSS file for styling
import CloseIcon from '@mui/icons-material/Close';


const SelectedSubject = ({ Subject, delFunction }) => {
  return (
    <div className="selected-subject">
      <span>{Subject}</span>
        <div onClick={() => delFunction(Subject)}>
           <CloseIcon className='close-icon' fontSize='small'/>
        </div>
    </div>
  );
};

export default SelectedSubject;
