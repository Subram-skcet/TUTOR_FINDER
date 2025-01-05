
import React from 'react';
import './SelectedSubject.css'; 
import { MdCancel } from "react-icons/md";

const SelectedSubject = ({ Subject, delFunction }) => {
  return (
    <div className="selected-subject">
      <span>{Subject}</span>
        <div onClick={() => delFunction(Subject)} className='subject-cancel-icon'>
           < MdCancel size="1.1em"/>
        </div>
    </div>
  );
};

export default SelectedSubject;
