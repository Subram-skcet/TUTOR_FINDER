import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyTution.css';

import { useNavigate } from 'react-router-dom';

import { useDataLayerValue } from '../../StateProviders/StateProvider';
import { toast } from 'react-toastify';
import MyTuition from '../../components/TuitionPageTuitionCard/MyTuition';
import { ThreeCircles } from 'react-loader-spinner'
import { IoMdAdd } from "react-icons/io";

const MyTution = () => {
  const navigate = useNavigate();
  const [{ asTeacher }] = useDataLayerValue(); // Get teacher ID from state provider
  const [tutions, setTutions] = useState([]); // Initialize as an empty array
  const [isLoading,setIsLoading] = useState(false)
  
  
  useEffect(() => {
    const fetchTutions = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get('https://find-my-tuition.onrender.com/api/v1/tution/gettutions', {
          params: { createdBy: asTeacher._id },
          withCredentials: true
        });
        setTutions(response.data.tutions || []); 
      } catch (error) {
        console.error('Error fetching tutions:', error);
      }
      finally{
        setIsLoading(false)
      }
    };
    fetchTutions();
  }, [asTeacher._id]);  

  const handleDeleteClick = async (index) => {
    try {
      const tutionToDelete = tutions[index];
      const response = await axios.delete(`https://find-my-tuition.onrender.com/api/v1/tution/${tutionToDelete._id}`, {
        data: { createdBy: tutionToDelete.createdBy } // Include createdBy in the request body
      });
      
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
      const response = await axios.patch(`https://find-my-tuition.onrender.com/api/v1/tution/${tutions[index]._id}`, {
        ...updatedTution,
        createdBy: asTeacher._id // Ensure createdBy is included in the request body
      });
  
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
      <h1 className='lato-bold'>Your Tuitions</h1>
      <div className='my-tutions'>
      {isLoading?
       <div className='circle-animation'>
        <ThreeCircles
        visible={true}
        height="100"
        width="100"
        color="#3689d6"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        />
       </div>    
      :
      <>
          {tutions.length === 0 ? 
          (
            <div className='mytuition-notuition-div'>
            <p className='empty-tuition-p pt-serif-regular lato-regular'>Currently, you haven't created any tuitions. Create one by clicking the button below.</p>
            </div>
          )
          :
          (
            tutions.map((tuition, index) => (
              <MyTuition
                key={tuition._id} 
                tuition={tuition}
                index={index}
                DeleteTuition={handleDeleteClick}
                SaveTuition={handleSaveClick}
              />
            ))
          )
          }
      </>
      }
        </div>
      <div>
        <button className='edit-prof-btn' onClick={() => navigate('/myaccount/teacherprofile/addtution')}>
          <div className='itms-cntr style-links-updated add-tut-bck lato-regular'>
            <IoMdAdd size="1.6em" />
            <p>Create Tuition</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default MyTution;
