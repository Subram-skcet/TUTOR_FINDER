import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyTution.css';

import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

import { useDataLayerValue } from '../../StateProviders/StateProvider';
import SelectedSubject from '../AddTution/Subjects';
import { subjects,standards } from '../../components/stateExporter';
import { toast } from 'react-toastify';
import MyTuition from '../../components/TuitionPageTuitionCard/MyTuition';

const MyTution = () => {
  const navigate = useNavigate();
  const [{ asTeacher }] = useDataLayerValue(); // Get teacher ID from state provider
  const [tutions, setTutions] = useState([]); // Initialize as an empty array
  const [editIndex, setEditIndex] = useState(null);
  const [isLoading,setIsLoading] = useState(false)
  const [TutionDetails, setDetails] = useState({
    subjects: [],
    duration:[],
    days:[],
    fees: 0,
    boards: [],
    standard:[]
  });
  
  const fetchTutions = async () => {
    try {
      const response = await axios.get('/api/v1/tution/gettutions', {
        params: { createdBy: asTeacher._id },
      });
      console.log(response)
      setTutions(response.data.tutions || []); // Ensure response matches the format and defaults to empty array
    } catch (error) {
      console.error('Error fetching tutions:', error);
    }
  };

  useEffect(() => {
    fetchTutions();
  }, []);  

  const handleDeleteClick = async (index) => {
    try {
      const tutionToDelete = tutions[index];
      const response = await axios.delete(`/api/v1/tution/${tutionToDelete._id}`, {
        data: { createdBy: tutionToDelete.createdBy } // Include createdBy in the request body
      });
      console.log(response);
      
      // Optionally check the response data
      if (response.status === 200) {
        toast.success('Tuition deleted successfully')
        setTutions((prevTutions) => prevTutions.filter((_, i) => i !== index));
      }
    } catch (error) {
      toast.error('Error deleting tuition')
      console.error('Error deleting tution:', error);
    }
  };

  const handleSaveClick = async (TuitionDetails, index) => {
    let updatedTution = TuitionDetails
    try {
      // Include createdBy in the updated tution data
      const response = await axios.patch(`/api/v1/tution/${tutions[index]._id}`, {
        ...updatedTution,
        createdBy: asTeacher._id // Ensure createdBy is included in the request body
      });
      console.log(response);
  
      if (response.status === 200) {
        toast.success('Tuition saved successfully')
        const updatedTution = response.data.tution;
        setTutions((prevTutions) => prevTutions.map((tution, i) =>
          i === index ? updatedTution : tution
        ));
      }
    } catch (error) {
      console.error('Error saving tution:', error);
    }
  };


  return (
    <div className='my-tution-container'>
      <h1>Your Tutions</h1>
      <div className='my-tutions'>
        {!isLoading && tutions.length === 0 ? 
        (
           <p>No tutions available</p>
        )
         :
         (
          tutions.map((tuition, index) => (
            <MyTuition 
              tuition={tuition}
              index={index}
              DeleteTuition={handleDeleteClick}
              SaveTuition={handleSaveClick}
            />
          ))
        )
        }
      </div>
      <div>
        <button className='edit-prof-btn spz' onClick={() => navigate('/myaccount/teacherprofile/addtution')}>
          <div className='itms-cntr style-links-updated add-tut-bck'>
            <AddIcon />
            <p>Create Tuition</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default MyTution;
