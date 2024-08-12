import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyTution.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import { useDataLayerValue } from '../../StateProviders/StateProvider';

const MyTution = () => {
  const navigate = useNavigate();
  const [{ asTeacher }] = useDataLayerValue(); // Get teacher ID from state provider
  const [tutions, setTutions] = useState([]); // Initialize as an empty array
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const fetchTutions = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/v1/tution/', {
          params: { createdBy: asTeacher._id },
        });
        console.log(response)
        setTutions(response.data.ResultSet || []); // Ensure response matches the format and defaults to empty array
      } catch (error) {
        console.error('Error fetching tutions:', error);
      }
    };

    fetchTutions();
  }, [asTeacher._id]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setTutions((prevTutions) => {
      const newTutions = [...prevTutions];
      // Adjust data processing based on name
      if (name === 'subjects' || name === 'boards' || name === 'days' || name === 'duration') {
        newTutions[index] = {
          ...newTutions[index],
          [name]: value.split(',').map(item => item.trim()),
        };
      } else {
        newTutions[index] = { ...newTutions[index], [name]: value };
      }
      return newTutions;
    });
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
  };

  const handleSaveClick = async (index) => {
    setEditIndex(null);
    try {
      const updatedTution = tutions[index];
      // Include createdBy in the updated tution data
      const response = await axios.patch(`http://localhost:3001/api/v1/tution/${updatedTution._id}`, {
        ...updatedTution,
        createdBy: asTeacher._id // Ensure createdBy is included in the request body
      });
  
      if (response.status === 200) {
        // Optionally, refetch tutions or update state directly if needed
        const updatedTution = response.data.tution;
        setTutions((prevTutions) => prevTutions.map((tution, i) =>
          i === index ? updatedTution : tution
        ));
      }
    } catch (error) {
      console.error('Error saving tution:', error);
    }
  };

  const handleDeleteClick = async (index) => {
    try {
      const tutionToDelete = tutions[index];
      const response = await axios.delete(`http://localhost:3001/api/v1/tution/${tutionToDelete._id}`, {
        data: { createdBy: tutionToDelete.createdBy } // Include createdBy in the request body
      });
      console.log(response);
      
      // Optionally check the response data
      if (response.status === 200) {
        setTutions((prevTutions) => prevTutions.filter((_, i) => i !== index));
      }
    } catch (error) {
      console.error('Error deleting tution:', error);
    }
  };

  return (
    <div className='my-tution-container'>
      <h1>Your Tutions</h1>
      <div className='my-tutions'>
        {tutions.length > 0 ? (
          tutions.map((tution, index) => (
            <div className="tutor-card" key={tution._id}>
              <div className="card-details">
                <p><strong>Subjects:</strong> {editIndex === index ? <input name="subjects" value={tution.subjects.join(', ')} onChange={(e) => handleChange(e, index)} /> : tution.subjects.join(', ')}</p>
                <p><strong>Time:</strong> {editIndex === index ? <input name="duration" value={tution.duration.join(', ')} onChange={(e) => handleChange(e, index)} /> : tution.duration.join(' - ')}</p>
                <p><strong>Day:</strong> {editIndex === index ? <input name="days" value={tution.days.join(', ')} onChange={(e) => handleChange(e, index)} /> : tution.days.join(' - ')}</p>
                <p><strong>Board:</strong> {editIndex === index ? <input name="boards" value={tution.boards.join(', ')} onChange={(e) => handleChange(e, index)} /> : tution.boards.join(', ')}</p>
                <p><strong>Fees:</strong> {editIndex === index ? <input name="fees" value={tution.fees} onChange={(e) => handleChange(e, index)} /> : tution.fees}</p>
              </div>
              <div className='tution-options'>
                {editIndex === index ? (
                  <button className='edit-prof-btn spz' onClick={() => handleSaveClick(index)}>
                    <div className='itms-cntr style-links sv-bck'>
                      <SaveIcon />
                      <p>Save</p>
                    </div>
                  </button>
                ) : (
                  <button className='edit-prof-btn spz' onClick={() => handleEditClick(index)}>
                    <div className='itms-cntr style-links ed-bck'>
                      <EditIcon />
                      <p>Edit</p>
                    </div>
                  </button>
                )}
                <button className='edit-prof-btn spz' onClick={() => handleDeleteClick(index)}>
                  <div className='itms-cntr style-links del-bck'>
                    <DeleteIcon />
                    <p>Delete</p>
                  </div>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No tutions available</p>
        )}
      </div>
      <div>
        <button className='edit-prof-btn spz' onClick={() => navigate('/myaccount/teacherprofile/addtution')}>
          <div className='itms-cntr style-links add-tut-bck'>
            <AddIcon />
            <p>Add Tution</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default MyTution;
