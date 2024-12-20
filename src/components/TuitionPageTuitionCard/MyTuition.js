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
import { IoMdArrowDropdown } from "react-icons/io";
import {convertTo12Hour} from '../../utils/TimeFormatConverter'
import { FaRupeeSign } from "react-icons/fa";
import { IoIosSave } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";


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
                    <IoIosSave size="1.45em"/>
                    </div>
                  </button>
                  <button className='edit-prof-btn spz' onClick={() => handleCancelClick()}>
                    <div className='itms-cntr style-links-updated cncl-bck'>
                    <MdCancel  size="1.45em"/> 
                    </div>
                  </button>
                  </>
                ) : (
                  <>
                    <button className='edit-prof-btn spz' onClick={() => handleEditClick()}>
                      <div className='itms-cntr style-links-updated ed-bck'>
                      <MdEdit size="1.45em"/>                   
                      </div>
                    </button>
                    <button className='edit-prof-btn spz' onClick={() => DeleteTuition(index)}>
                      <div className='itms-cntr style-links-updated del-bck'>
                      <MdDelete size="1.45em"/>
                      </div>
                    </button>
                  </>
                )}
        </div>
        
        <div className={`${(isBelow626px && isEditing)? 'tuition-grid-edited':isEditing ? 'tuition-grid' : 'tuition-grid tuition-grid-nrml'}`}>
        <div className='subject-label-div'>
            <label className="poppins-font">Subjects:</label>
        </div>

        {
            isEditing ?
            <div className="isEditing-div">
              <div className='select-container'>
                <select onChange={HandleSubjectSelect} className='select-box'>
                    <option value="">Add Subjects</option>
                    {asTeacher.subjects.map((subject,index)=>(
                      <option key={index} value={subject}>{subject}</option>
                    ))}
                 </select>
                 <div className='drp-icon'>
                  <IoMdArrowDropdown size="1.6em"/>
                 </div>
                </div>
                 {
                  TuitionDetails.subjects.length > 0 && 
                 <div className="selected-items gp">
                    {TuitionDetails.subjects.map((subject) => (
                      <SelectedSubject key={subject} Subject={subject} delFunction={HandleSubjectRemove} />
                    ))}
                </div>
                 }
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
            <div className='time-flex'>
                <p>Start Time:</p>
                <input type="time" name="duration" className='time-tg-styl' value={TuitionDetails.duration[0]} onChange={(e)=>handleArrayChange(e,0)} />
            </div>
            <div className='time-flex'>
                <p>End Time:</p>
                <input type="time" name="duration" className='time-tg-styl' value={TuitionDetails.duration[1]} onChange={(e)=>handleArrayChange(e,1)} />
            </div>
           </div>
            :
            <div className="tuition-value-div">
               <p>{`${convertTo12Hour(tuition.duration[0])} - ${convertTo12Hour(tuition.duration[1])}`}</p>
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
                    <div className='days-flex'>
                        <div>
                            <label>From:</label>
                        </div>
                        <div className='select-container dys-slt-cntr'>
                        <select value={TuitionDetails.days[0]} name="days" onChange={(e)=>handleArrayChange(e,0)} className='select-box dt-select'>
                            {
                              daysOfWeek.map((days)=>(
                                <option value={days}>{days}</option>
                              ))
                            }
                        </select>
                         <div className='drp-icon dt-drp'>
                           <IoMdArrowDropdown size="1.6em"/>
                         </div>
                          </div>
                    </div>
                    <div className='days-flex'>
                        <div>
                            <label>To:</label>
                        </div>
                        <div className='select-container dys-slt-cntr'>
                          <select value={TuitionDetails.days[1]} name="days" onChange={(e)=>handleArrayChange(e,1)} className='select-box dt-select'>
                              {
                                  daysOfWeek.map((days)=>(
                                      <option value={days}>{days}</option>
                                  ))
                              }
                          </select>
                          <div className='drp-icon dt-drp'>
                           <IoMdArrowDropdown size="1.6em"/>
                          </div>
                        </div>
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
              <div className='select-container'>
                <select name="boards" onChange={HandleBoardSelect} className='select-box'>
                <option value="">Select a board</option>
                {
                  boards.map((board)=>(
                    <option value={board}>{board}</option>
                  ))
                }
              </select>
                <div className='drp-icon'>
                            <IoMdArrowDropdown size="1.6em"/>
                </div>
              </div>
              {
              TuitionDetails.boards.length > 0 && 
              <div className="selected-items gp">
                {TuitionDetails.boards.map((board) => (
                  <SelectedSubject key={board} Subject={board} delFunction={HandleBoardRemove} />
                ))}
              </div>
              }
            </div>
            :
            <div className="tuition-value-div"><p>{tuition.boards.join(', ')}</p></div>
        }
        <div className={`${(isBelow626px && isEditing)? 'isEditing-label':''}`}>
            <label className="poppins-font">Standard:</label>
        </div>
        {isEditing?
          <div className="std-select">
          <div className='std-flex'>
            <label>From:</label>
            <div className='select-container std-select-tag'>
            <select value={TuitionDetails.standard[0]} name="standard" onChange={(e)=>handleArrayChange(e,0)} className='select-box std-slt-cntr'>
              {
                standards.map((standard)=>(
                  <option value={standard}>{standard}</option>
                ))
              }
            </select>
             <div className='drp-icon std-drp'>
                  <IoMdArrowDropdown size="1.6em"/>
              </div>
            </div>
          </div>
          <div className='std-flex'>
            <label>To:</label>
            <div className='select-container std-select-tag'>
            <select value={TuitionDetails.standard[1]} name="standard" onChange={(e)=>handleArrayChange(e,1)} className='select-box std-slt-cntr'>
               {
                 standards.map((standard)=>(
                   <option value={standard}>{standard}</option>
                  ))
                }
            </select>
            <div className='drp-icon std-drp'>
                  <IoMdArrowDropdown size="1.6em"/>
              </div>
            </div>
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
              <input name="fees" value={TuitionDetails.fees} onChange={(e) => handleChange(e)} className="fees-input"/> 
            </div>
            :
            <div className="tuition-value-div">
                <p><FaRupeeSign size='0.8em'/>{tuition.fees}</p>
            </div>
         }
    </div>
        <div className='tution-options'>
                {isEditing?(
                  <>
                  <button className='edit-prof-btn spz' onClick={() => handleSaveClick(index)}>
                    <div className='itms-cntr style-links-updated sv-bck'>
                    <IoIosSave size="1.45em"/>
                      <p>Save</p>
                    </div>
                  </button>
                  <button className='edit-prof-btn spz' onClick={() => handleCancelClick()}>
                    <div className='itms-cntr style-links-updated cncl-bck'>
                    <MdCancel  size="1.45em"/> 
                      <p>Cancel</p>
                    </div>
                  </button>
                  </>
                ) : (
                  <>
                    <button className='edit-prof-btn spz' onClick={() => handleEditClick()}>
                      <div className='itms-cntr style-links-updated ed-bck'>
                      <MdEdit  size="1.45em"/> 
                        <p>Edit</p>
                      </div>
                    </button>
                    <button className='edit-prof-btn spz' onClick={() => DeleteTuition(index)}>
                      <div className='itms-cntr style-links-updated del-bck'>
                      <MdDelete size="1.45em"/>
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
