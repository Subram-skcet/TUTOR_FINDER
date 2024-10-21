import React, { useState } from 'react'
import './MyTuition.css'
import SelectedSubject from '../../MyAccountPage/AddTution/Subjects';
import { subjects,daysOfWeek,boards,standards } from '../stateExporter';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';
import { useDataLayerValue } from '../../StateProviders/StateProvider';
import { toast } from 'react-toastify';
import { useMediaQuery } from 'react-responsive'; 

const MyTuition = ({tuition,index,DeleteTuition,SaveTuition}) => {
    const [TuitionDetails, setDetails] = useState({
        subjects: [],
        duration:[],
        days:[],
        fees: 0,
        boards: [],
        standard:[]
      });
    const [isEditing,setIsEditing] = useState(false)
    const [{asTeacher},dispatch] = useDataLayerValue()
    const isBelow626px = useMediaQuery({ query: '(max-width: 626px)' })
    const isBelow400px = useMediaQuery({ query: '(max-width: 400px)' })

    const HandleSubjectSelect = (e) => {
        const selectedSubject = e.target.value;
        if (!TuitionDetails.subjects.includes(selectedSubject)) {
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
    const HandleBoardSelect = (e) => {
        const selectedBoard = e.target.value;
        if (!TuitionDetails.boards.includes(selectedBoard)) {
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

      const handleEditClick = () => {
        let editTution = { ...tuition}
        console.log(editTution);
        delete editTution._id
        delete editTution.createdBy
        delete editTution.__v
        delete editTution.createdAt
        delete editTution.updatedAt
        
        console.log(editTution);
        setDetails(editTution)
        console.log(TuitionDetails);
        setIsEditing(true)
      };
      const handleCancelClick = () =>{
         setIsEditing(false);
      }
    
      const handleSaveClick = async (index) => {
        SaveTuition(TuitionDetails,index)
        setIsEditing(false);
      };

      const handleChange = (e) => {
        const { name, value } = e.target;
        setDetails((prevDetails)=>({
              ...prevDetails,
              [name]:value
        }))
      
    };

  return (
    <div className='tuition-wrapper'>
      <div className='mobile-icons'>
                {isEditing?(
                  <>
                  <button className='edit-prof-btn spz' onClick={() => handleSaveClick(index)}>
                    <div className='itms-cntr style-links-updated sv-bck'>
                      <SaveIcon fontSize="small"/>
                    </div>
                  </button>
                  <button className='edit-prof-btn spz' onClick={() => handleCancelClick()}>
                    <div className='itms-cntr style-links-updated cncl-bck'>
                      <CloseIcon fontSize="small"/>
                    </div>
                  </button>
                  </>
                ) : (
                  <>
                    <button className='edit-prof-btn spz' onClick={() => handleEditClick()}>
                      <div className='itms-cntr style-links-updated ed-bck'>
                        <EditIcon fontSize="small"/>                     
                      </div>
                    </button>
                    <button className='edit-prof-btn spz' onClick={() => DeleteTuition(index)}>
                      <div className='itms-cntr style-links-updated del-bck'>
                        <DeleteIcon fontSize="small"/>
                      </div>
                    </button>
                  </>
                )}
        </div>

      <div className={`${(isBelow626px && isEditing)? 'tuition-grid-edited':'tuition-grid'}`}>
        <div className='subject-label-div'>
            <label className="poppins-font">Subjects:</label>
        </div>

        {
            isEditing ?
            <div className="isEditing-div">
                <select onChange={HandleSubjectSelect}>
                    <option value="">Add Subjects</option>
                    {subjects.map((subject)=>(
                      <option value={subject.value}>{subject.label}</option>
                    ))}
                 </select>
                 <div className="selected-items gp">
                    {TuitionDetails.subjects.map((subject) => (
                      <SelectedSubject key={subject} Subject={subject} delFunction={HandleSubjectRemove} />
                    ))}
                </div>
            </div>
            :
            <div className="tuition-value-div">
                <p>{tuition.subjects.join(', ')}</p>
            </div>
        }

        <div className={`${(isBelow626px && isEditing)? 'isEditing-label':''}`}>
            <label className="poppins-font">Time:</label>
        </div>

        {
            isEditing?
            <div className="time-inputs">
            <div className='inputs-flex'>
                <p>Start Time:</p>
                <input type="time" name="duration" value={TuitionDetails.duration[0]} onChange={(e)=>handleArrayChange(e,0)} />
            </div>
            <div className='inputs-flex'>
                <p>End Time:</p>
                <input type="time" name="duration" value={TuitionDetails.duration[1]} onChange={(e)=>handleArrayChange(e,1)} />
            </div>
           </div>
            :
            <div className="tuition-value-div">
                <p>{tuition.duration.join(' - ')}</p>
            </div>
        }

        <div className={`${(isBelow626px && isEditing)? 'isEditing-label':''}`}>
            <label className="poppins-font">Days:</label>
        </div>

        {
            isEditing ?
            <div className='days-inputs'>
                {
                <>
                    <div className='inputs-flex'>
                        <div>
                            <label>From:</label>
                        </div>
                        <select value={TuitionDetails.days[0]} name="days" onChange={(e)=>handleArrayChange(e,0)}>
                            {
                                daysOfWeek.map((days)=>(
                                    <option value={days.value}>{days.value}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='inputs-flex'>
                        <div>
                            <label>To:</label>
                        </div>
                        <select value={TuitionDetails.days[1]} name="days" onChange={(e)=>handleArrayChange(e,1)}>
                            {
                                daysOfWeek.map((days)=>(
                                    <option value={days.value}>{days.value}</option>
                                ))
                            }
                        </select>
                    </div>
                </>
                }
            </div>
               :
                    <div className="tuition-value-div">
                        <p>{tuition.days.join(' - ')}</p>
                    </div>
        }

       <div className={`${(isBelow626px && isEditing)? 'isEditing-label':''}`}>
            <label className="poppins-font">Boards:</label>
        </div>

        {
            isEditing?
            <div className="isEditing-div">
                <select name="boards" onChange={HandleBoardSelect}>
                <option value="">Select a board</option>
                {
                    boards.map((board)=>(
                        <option value={board.value}>{board.value}</option>
                    ))
                }
              </select>
              <div className="selected-items gp">
                {TuitionDetails.boards.map((board) => (
                  <SelectedSubject key={board} Subject={board} delFunction={HandleBoardRemove} />
                ))}
              </div>
            </div>
            :
            <div className="tuition-value-div"><p>{tuition.boards.join(', ')}</p></div>
        }
        <div className={`${(isBelow626px && isEditing)? 'isEditing-label':''}`}>
            <label className="poppins-font">Standard:</label>
        </div>
        {isEditing?
          <div className="std-select">
          <div className='inputs-flex'>
            <label>From:</label>
            <select value={TuitionDetails.standard[0]} name="standard" onChange={(e)=>handleArrayChange(e,0)}>
              {
                standards.map((standard)=>(
                   <option value={standard.value}>{standard.value}</option>
                ))
              }
            </select>
          </div>
          <div className='inputs-flex'>
            <label>To:</label>
            <select value={TuitionDetails.standard[1]} name="standard" onChange={(e)=>handleArrayChange(e,1)}>
               {
                standards.map((standard)=>(
                   <option value={standard.value}>{standard.value}</option>
                ))
                }
            </select>
          </div>
        </div>
         :
         <div className="tuition-value-div">
            <p>{tuition.standard.join(' - ')}</p>
         </div>
         }
         <div className={`${(isBelow626px && isEditing)? 'isEditing-label':''}`}>
            <label className="poppins-font">Fees:</label> 
         </div>
         {
            isEditing?
            <div className="isEditing-div">
              <input name="fees" value={TuitionDetails.fees} onChange={(e) => handleChange(e)} className="fee-input"/> 
            </div>
            :
            <div className="tuition-value-div">
                <p>{tuition.fees}</p>
            </div>
         }
    </div>
        <div className='tution-options'>
                {isEditing?(
                  <>
                  <button className='edit-prof-btn spz' onClick={() => handleSaveClick(index)}>
                    <div className='itms-cntr style-links-updated sv-bck'>
                      <SaveIcon />
                      <p>Save</p>
                    </div>
                  </button>
                  <button className='edit-prof-btn spz' onClick={() => handleCancelClick()}>
                    <div className='itms-cntr style-links-updated cncl-bck'>
                      <CloseIcon />
                      <p>Cancel</p>
                    </div>
                  </button>
                  </>
                ) : (
                  <>
                    <button className='edit-prof-btn spz' onClick={() => handleEditClick()}>
                      <div className='itms-cntr style-links-updated ed-bck'>
                        <EditIcon />
                        <p>Edit</p>
                      </div>
                    </button>
                    <button className='edit-prof-btn spz' onClick={() => DeleteTuition(index)}>
                      <div className='itms-cntr style-links-updated del-bck'>
                        <DeleteIcon />
                        <p>Delete</p>
                      </div>
                    </button>
                  </>
                )}
        </div>
    </div>
  )
}

export default MyTuition
