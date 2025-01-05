import React, { useEffect, useState } from 'react'
import './MyTuition.css'
import SelectedSubject from '../../MyAccountPage/AddTution/Subjects';
import { subjects,daysOfWeek,boards,standards } from '../stateExporter';
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
import StudentSideMap from '../StudentMap/StudentSideMap'
import MapComponent from '../TeacherMap/AMapSample';
import Modal from '../Modal/Modal'
import { IoMdCheckmarkCircle } from "react-icons/io";
import { FaMapLocationDot } from "react-icons/fa6";
import { isTimeAfter } from '../../utils/isTimeAfter';
import { isRomanAfter } from '../../utils/isRomanAfter';
import { FaLocationDot } from "react-icons/fa6";
import { BiCurrentLocation } from "react-icons/bi";
import { MdWarningAmber } from "react-icons/md";



const MyTuition = ({tuition,index,DeleteTuition,SaveTuition}) => {
    const [TuitionDetails, setDetails] = useState({
        subjects: [],
        duration:[],
        days:[],
        fees: 0,
        boards: [],
        standard:[],
        location:[]
      });
    const [isEditing,setIsEditing] = useState(false)
    const [{asTeacher},dispatch] = useDataLayerValue()
    const isBelow626px = useMediaQuery({ query: '(max-width: 626px)' })
    const isBelow400px = useMediaQuery({ query: '(max-width: 400px)' })
    const [isCurrentLocMapOpen,setCurrentLocMapOpen] = useState(false)
    const [isUpdateLocMapOpen,setUpdateLocMapOpen] = useState(false)
    const [location, setLocation] = useState({ lat: null, lng: null });
    const [errorText,setErrorText] = useState('This is error text')
    
    
    
    useEffect(()=>{
        if(location.lat && location.lng){
          setDetails((prevDetails)=>({
            ...prevDetails,
            location:[location.lat,location.lng]
          }))
          console.log("Location Updated")
        }
    },[location])

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ lat: latitude, lng: longitude });
            toast.info("Ensure that the correct location of the tuition is displayed on the map if you set location by 'Current location'")
          },
          (err) => {
            toast.error(err.message);
          },
          { enableHighAccuracy: true }
        );
      } else {
        toast.info("Geolocation is not supported by this browser.");
      }
    };
    
    const setLatLngfromChd = (lat,lng) =>{
      console.log(lat,lng);
      
      setLocation({
        lat,lng
      })
    }

    const HandleSubjectSelect = (e) => {
      if(setErrorText)
          setErrorText('')
        const selectedSubject = e.target.value;
        if (selectedSubject.length > 0 && !TuitionDetails.subjects.includes(selectedSubject)) {
          setDetails((prevDetails) => ({
            ...prevDetails,
            subjects: [...prevDetails.subjects, selectedSubject],
          }));
        }
      };

      const HandleSubjectRemove = (subjectToRemove) => {
        if(setErrorText)
          setErrorText('')
        setDetails((prevDetails) => ({
          ...prevDetails,
          subjects: prevDetails.subjects.filter((subject) => subject !== subjectToRemove),
        }));
      };

      const handleArrayChange =(e,index) =>{
        if(setErrorText)
          setErrorText('')
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
      if(setErrorText)
        setErrorText('')
        const selectedBoard = e.target.value;
        if (selectedBoard.length > 0 && !TuitionDetails.boards.includes(selectedBoard)) {
          setDetails((prevDetails) => ({
            ...prevDetails,
            boards: [...prevDetails.boards, selectedBoard],
          }));
        }
      };
    
      const HandleBoardRemove = (boardToRemove) => {
        if(setErrorText)
          setErrorText('')
        setDetails((prevDetails) => ({
          ...prevDetails,
          boards: prevDetails.boards.filter((board) => board !== boardToRemove),
        }));
      };

      const handleEditClick = () => {
        if(setErrorText)
          setErrorText('')
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
        setLocation({ lat: null, lng: null })
        setIsEditing(true)
      };
      const handleCancelClick = () =>{
         setIsEditing(false);
      }

      const validateTuition = () =>{
          if(TuitionDetails.subjects.length === 0){
            setErrorText("Select at least one subject from the list.")
            return false;
          }

          if(TuitionDetails.boards.length === 0){
            setErrorText("Choose at least one board from the list.")
            return false;
          }

           if(!isTimeAfter(TuitionDetails.duration[1],TuitionDetails.duration[0]))  {
                   setErrorText("End time must be greater than the start time.")
                   return false;
            }

            if(!isRomanAfter(TuitionDetails.standard[0],TuitionDetails.standard[1])){
                     setErrorText("End standard must not precede the start standard.")
                     return false
            }

            if(!TuitionDetails.fees){
                setErrorText("Tuition Fees must not be empty.")
                return false
            }

          return true;
      }

    
      const handleSaveClick = async (index) => {
        const tuitionValidated = validateTuition();

        if(tuitionValidated){
          console.log(location);
          
          SaveTuition(TuitionDetails,index)
          setIsEditing(false);
        }
      };

      const handleChange = (e) => {
        if(errorText)
           setErrorText('')
        const { name, value } = e.target;
        let sanitizedValue = value;
    
        if (name === "fees") {
            sanitizedValue = value.replace(/[^0-9]/g, ""); // Sanitize input for 'fees'
        }
    
        setDetails((prevDetails) => ({
            ...prevDetails,
            [name]: sanitizedValue, // Use sanitized value
        }));
    };

  return (
    <>
     <Modal  childrenWidth={400} isopen={isCurrentLocMapOpen} onClose={()=>setCurrentLocMapOpen(false)}>
            <StudentSideMap lat={tuition.location[0]} lng={tuition.location[1]}/>
     </Modal>
     <Modal childrenWidth={400}  isopen={isUpdateLocMapOpen} onClose={()=>setUpdateLocMapOpen(false)}>
        <MapComponent setLatLng = {setLatLngfromChd}/>
      </Modal>
    <div className='tuition-wrapper lato-regular'>
      <div className='tuition-flx'>

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
                      <MdEdit  size="1.45em"/>                      
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

      <div className={`${(isBelow626px && isEditing)? 'tuition-grid-edited':'tuition-grid'}`}>
        <div className='subject-label-div'>
            <label className="lato-bold">Subjects:</label>
        </div>

        {
            isEditing ?
            <div className="isEditing-div">
              <div className='select-container'>
                <select onChange={HandleSubjectSelect} className='select-box lato-regular'>
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
            <label className="lato-bold">Time:</label>
        </div>

        {
            isEditing?
            <div className="time-inputs">
            <div className='time-flex'>
                <p>Start Time:</p>
                <input type="time" name="duration" className='time-tg-styl lato-regular' value={TuitionDetails.duration[0]} onChange={(e)=>handleArrayChange(e,0)} required/>
            </div>
            <div className='time-flex'>
                <p>End Time:</p>
                <input type="time" name="duration" className='time-tg-styl lato-regular' value={TuitionDetails.duration[1]} onChange={(e)=>handleArrayChange(e,1)} required/>
            </div>
           </div>
            :
            <div className="tuition-value-div">
               <p>{`${convertTo12Hour(tuition.duration[0])} - ${convertTo12Hour(tuition.duration[1])}`}</p>
            </div>
        }

        <div className={`${(isBelow626px && isEditing)? 'isEditing-label':''}`}>
            <label className="lato-bold">Days:</label>
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
                        <select value={TuitionDetails.days[0]} name="days" onChange={(e)=>handleArrayChange(e,0)} className='select-box lato-regular dt-select' required>
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
                          <select value={TuitionDetails.days[1]} name="days" onChange={(e)=>handleArrayChange(e,1)} className='select-box lato-regular dt-select' required>
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
            <label className="lato-bold">Boards:</label>
        </div>

        {
            isEditing?
            <div className="isEditing-div">
              <div className='select-container'>
                <select name="boards" onChange={HandleBoardSelect} className='select-box lato-regular' required>
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
            <label className="lato-bold">Standard:</label>
        </div>
        {isEditing?
          <div className="std-select">
          <div className='std-flex'>
            <label>From:</label>
            <div className='select-container std-select-tag'>
            <select value={TuitionDetails.standard[0]} name="standard" onChange={(e)=>handleArrayChange(e,0)} className='select-box lato-regular std-slt-cntr' required>
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
            <select value={TuitionDetails.standard[1]} name="standard" onChange={(e)=>handleArrayChange(e,1)} className='select-box lato-regular std-slt-cntr' required>
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
            <label className="lato-bold">Fees:</label> 
         </div>
         {
           isEditing?
           <div className="isEditing-div">
             <div className='fee-inp-div'>
                  <FaRupeeSign size='1em'/>
                  <input type='text' name="fees" value={TuitionDetails.fees} onChange={(e) => handleChange(e)} className='fees-input-styl lato-regular' inputMode="numeric"/> 
              </div>
            </div>
            :
            <div className="tuition-value-div">
                <p className='tut-pg-fee lato-bold'><FaRupeeSign size='0.85em'/>{tuition.fees}</p>
            </div>
         }
         <div>
           <label className='lato-bold'>Location:</label>
         </div>
         {
          isEditing?
          (!location.lat || !location.lng)?
          
          <div className='location-choose-btn'>
            <button className="see-loc-btn lato-bold" onClick={getLocation}>
              <div className='see-loc-div'>
                <BiCurrentLocation size="1.3em"/>
                <p>Set Current location</p>
              </div> 
              </button>
            or
            <button className="see-loc-btn lato-bold" onClick={()=> setUpdateLocMapOpen(true)}>
              <div className='see-loc-div'>
                <FaMapLocationDot size="1.3em"/>
                <p>Choose on Map</p>
              </div> 
              
              </button>
          </div>

:
<div className='loc-ad-div'>
                <p>Location added</p>
                <div className='loc-ad-ic'>
                  <IoMdCheckmarkCircle size="1.2em"/>
                </div>
           </div>
          :
          <button  className="see-loc-btn lato-bold" onClick={()=>setCurrentLocMapOpen(true)}>
            <div className='see-loc-div lato-bold'>
                <FaLocationDot size="1.1em"/>
                <p>See Location</p>
            </div>
            
            </button>
        }
    </div>
        <div className='tution-options'>
                {isEditing?(
                  <>
                  <button className='edit-prof-btn spz' onClick={() => handleSaveClick(index)}>
                    <div className='itms-cntr style-links-updated sv-bck lato-regular'>
                    <IoIosSave size="1.45em"/>
                      <p>Save</p>
                    </div>
                  </button>
                  <button className='edit-prof-btn spz' onClick={() => handleCancelClick()}>
                    <div className='itms-cntr style-links-updated cncl-bck lato-regular'>
                    <MdCancel  size="1.45em"/> 
                      <p>Cancel</p>
                    </div>
                  </button>
                  </>
                ) : (
                  <>
                    <button className='edit-prof-btn spz' onClick={() => handleEditClick()}>
                      <div className='itms-cntr style-links-updated ed-bck lato-regular'>
                      <MdEdit  size="1.45em"/> 
                        <p>Edit</p>
                      </div>
                    </button>
                    <button className='edit-prof-btn spz' onClick={() => DeleteTuition(index)}>
                      <div className='itms-cntr style-links-updated del-bck lato-regular'>
                      <MdDelete size="1.45em"/>
                        <p>Delete</p>
                      </div>
                    </button>
                  </>
                )}
        </div>
    </div>
                {isEditing && errorText && 
                           <div className='error-para-div er-streg'>
                                <div className='amber-icon'>
                                  <MdWarningAmber size="1.3em"/>
                                </div>
                               <p className='errorText'>{errorText}</p>
                           </div>
               }
    </div>
                  </>
  )
}

export default MyTuition
