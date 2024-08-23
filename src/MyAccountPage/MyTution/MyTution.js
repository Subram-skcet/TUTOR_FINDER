import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyTution.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import { useDataLayerValue } from '../../StateProviders/StateProvider';
import SelectedSubject from '../AddTution/Subjects';
import { subjects,standards } from '../../components/stateExporter';

const MyTution = () => {
  const navigate = useNavigate();
  const [{ asTeacher }] = useDataLayerValue(); // Get teacher ID from state provider
  const [tutions, setTutions] = useState([]); // Initialize as an empty array
  const [editIndex, setEditIndex] = useState(null);

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
      const response = await axios.get('http://localhost:3001/api/v1/tution/gettutions', {
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


  const handleArrayChange =(e,index) =>{
      const { name,value } = e.target;
      console.log(name , value);
      setDetails(prevDetails => {
          const newcombo = [...prevDetails[name]];
          console.log(newcombo);
          newcombo[index] = value;
          return {
              ...prevDetails,
              [name]: newcombo
          };
      });
  }

  const handleChange = (e) => {
      const { name, value } = e.target;
      setDetails((prevDetails)=>({
            ...prevDetails,
            [name]:value
      }))
    
  };

  const handleEditClick = (index) => {
    let editTution = { ...tutions[index]}
    delete editTution._id
    delete editTution.createdBy
    delete editTution.__v
    
    console.log(editTution);
    setDetails(editTution)
    console.log(TutionDetails);
    setEditIndex(index);
  };
  const handleCancelClick = (indes) =>{
     setEditIndex(null);
  }

  const handleSaveClick = async (index) => {
    console.log(index);
    console.log(tutions);
    try {
      const updatedTution = TutionDetails;
      // Include createdBy in the updated tution data
      const response = await axios.patch(`http://localhost:3001/api/v1/tution/${tutions[index]._id}`, {
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
    setEditIndex(null);
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

  const HandleSubjectSelect = (e) => {
    const selectedSubject = e.target.value;
    if (!TutionDetails.subjects.includes(selectedSubject)) {
      setDetails((prevDetails) => ({
        ...prevDetails,
        subjects: [...prevDetails.subjects, selectedSubject],
      }));
    }
  };

  const HandleSubjectRemove = (subjectToRemove) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      subjects: prevDetails.subjects.filter((subject) => subject !== subjectToRemove),
    }));
  };

  const HandleBoardSelect = (e) => {
    const selectedBoard = e.target.value;
    if (!TutionDetails.boards.includes(selectedBoard)) {
      setDetails((prevDetails) => ({
        ...prevDetails,
        boards: [...prevDetails.boards, selectedBoard],
      }));
    }
  };

  const HandleBoardRemove = (boardToRemove) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      boards: prevDetails.boards.filter((board) => board !== boardToRemove),
    }));
  };

  return (
    <div className='my-tution-container'>
      <h1>Your Tutions</h1>
      <div className='my-tutions'>
        {tutions.length > 0 ? (
          tutions.map((tution, index) => (
            <div className="tutor-card" key={tution._id}>
              <div className="card-details">
                <p>
                  <strong>Subjects:</strong>
                   {
                   editIndex === index ?
                   <>
                  {/* <input name="subjects" value={tution.subjects.join(', ')} onChange={(e) => handleChange(e, index)} /> */}
                  <select onChange={HandleSubjectSelect}>
                    <option value="">Add Subjects</option>
                    {subjects.map((subject)=>(
                      <option value={subject.value}>{subject.label}</option>
                    ))}
                 </select>
                  <div className="selected-items">
                    {TutionDetails.subjects.map((subject) => (
                      <SelectedSubject key={subject} Subject={subject} delFunction={HandleSubjectRemove} />
                    ))}
                  </div>
                   </>
                   : tution.subjects.join(', ')
                   }
               </p>
                <p>
                  <strong>Time:</strong>
                   {
                   editIndex === index ? 
                   <>
                   {/* <input name="duration" value={tution.duration.join(', ')} onChange={(e) => handleChange(e, index)} /> */}
                   <div className="time-inputs">
                    <div>
                        <p>Start Time:</p>
                        <input type="time" name="duration" value={TutionDetails.duration[0]} onChange={(e)=>handleArrayChange(e,0)} />
                    </div>
                    <div>
                        <p>End Time:</p>
                        <input type="time" name="duration" value={TutionDetails.duration[1]} onChange={(e)=>handleArrayChange(e,1)} />
                    </div>
                   </div>
                   </>
                    :
                     tution.duration.join(' - ')
                  }
                </p>
                <p><strong>Days:</strong> 
                    {
                    editIndex === index ?
                    <>
                    {/* <input name="days" value={tution.days.join(', ')} onChange={(e) => handleChange(e, index)} /> */}
                    <div className="day-select">
                        <div>
                          <p>From:</p>
                          <select value={TutionDetails.days[0]} name="days" onChange={(e)=>handleArrayChange(e,0)}>
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                            <option value="Saturday">Saturday</option>
                            <option value="Sunday">Sunday</option>
                          </select>
                        </div>
                        <div>
                          <p>To:</p>
                          <select value={TutionDetails.days[1]} name="days" onChange={(e)=>handleArrayChange(e,1)}>
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                            <option value="Saturday">Saturday</option>
                            <option value="Sunday">Sunday</option>
                          </select>
                        </div>
                    </div>
                    </> 
                    : 
                    tution.days.join(' - ')
                    }
                 </p>
                <p><strong>Board:</strong> 
                {
                editIndex === index ? 
                <>
                {/* <input name="boards" value={tution.boards.join(', ')} onChange={(e) => handleChange(e, index)} />  */}
              <select name="boards" onChange={HandleBoardSelect}>
                <option value="">Select a board</option>
                <option value="CBSE">CBSE</option>
                <option value="State Board">State Board</option>
                <option value="ICSE">ICSE</option>
              </select>
              <div className="selected-items">
                {TutionDetails.boards.map((board) => (
                  <SelectedSubject key={board} Subject={board} delFunction={HandleBoardRemove} />
                ))}
              </div>
                </>
                :
                 tution.boards.join(', ')
                 }
                 </p>
                 <p>
                  <strong>Standard:</strong>
                  {
                    editIndex === index ?
                    <>
                       <div className="std-select">
            <div>
              <label>Class From:</label>
              <select value={TutionDetails.standard[0]} name="standard" onChange={(e)=>handleArrayChange(e,0)}>
                {
                  standards.map((standard)=>(
                     <option value={standard.value}>{standard.value}</option>
                  ))
                }
              </select>
            </div>
            <div>
              <label>Class To:</label>
              <select value={TutionDetails.standard[1]} name="standard" onChange={(e)=>handleArrayChange(e,1)}>
                 {
                  standards.map((standard)=>(
                     <option value={standard.value}>{standard.value}</option>
                  ))
                  }
              </select>
            </div>
          </div>
                    </>
                    :
                    tution.standard.join(' - ')
                  }
                 </p>
                <p><strong>Fees:</strong> 
                 {
                  editIndex === index ? 
                  <input name="fees" value={TutionDetails.fees} onChange={(e) => handleChange(e)} /> 
                  :
                  tution.fees
                 }
                 </p>
              </div>
              <div className='tution-options'>
                {editIndex === index ? (
                  <>
                  <button className='edit-prof-btn spz' onClick={() => handleSaveClick(index)}>
                    <div className='itms-cntr style-links-updated sv-bck'>
                      <SaveIcon />
                      <p>Save</p>
                    </div>
                  </button>
                  <button className='edit-prof-btn spz' onClick={() => handleCancelClick(index)}>
                    <div className='itms-cntr style-links-updated cncl-bck'>
                      <CloseIcon />
                      <p>Cancel</p>
                    </div>
                  </button>
                  </>
                ) : (
                  <>
                    <button className='edit-prof-btn spz' onClick={() => handleEditClick(index)}>
                      <div className='itms-cntr style-links-updated ed-bck'>
                        <EditIcon />
                        <p>Edit</p>
                      </div>
                    </button>
                    <button className='edit-prof-btn spz' onClick={() => handleDeleteClick(index)}>
                      <div className='itms-cntr style-links-updated del-bck'>
                        <DeleteIcon />
                        <p>Delete</p>
                      </div>
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No tutions available</p>
        )}
      </div>
      <div>
        <button className='edit-prof-btn spz' onClick={() => navigate('/myaccount/teacherprofile/addtution')}>
          <div className='itms-cntr style-links-updated add-tut-bck'>
            <AddIcon />
            <p>Add Tution</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default MyTution;
