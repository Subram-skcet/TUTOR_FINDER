import React, { useState } from 'react';
import './TutionCard.css';
import DisplayRating from '../DisplayRating';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import axios from 'axios';
import {useDataLayerValue} from '../../StateProviders/StateProvider'
import Modal from '../Modal/Modal';
import LoginModal from '../LoginModal/LoginModal';
import { formatDistanceToNow } from "date-fns";

function TutionCard({tution,index,profilenavigate}) {
    const [{asStudent,logged,logged_as},dispatch] = useDataLayerValue()
    const [isBookMark,setBookMark] = useState(()=>{
        if(logged && logged_as === 'student'){
            return asStudent.favouriteTutions.includes(tution._id);
        }
        return false
    })
    const [isLoginModalOpen,setLoginModelOpen] = useState(false)


    const extractDateFields = () => {
        // Create a Date object from the ISO string
        const date = new Date(tution.createdAt);
    
        // GMT+5:30 time zone offset in milliseconds
        // const offsetInMinutes = 330; // 5 hours 30 minutes
        // const offsetInMilliseconds = offsetInMinutes * 60 * 1000;
    
        // Apply the offset to the date to convert it to GMT+5:30
        const localDate = new Date(date.getTime());
    
        // Extract the year, month, day, hours, minutes, and seconds
        const year = localDate.getFullYear();
        const month = localDate.getMonth();
        const day = localDate.getDate();
        const hours = localDate.getHours();
        const minutes = localDate.getMinutes();
        const seconds = localDate.getSeconds();
    
        console.log(year, month, day, hours, minutes, seconds);
    
        // Calculate the distance from now
        return formatDistanceToNow(localDate, { includeSeconds: true });
    };


    const BookMarkTution = async() =>{
        if(!logged || logged_as !== 'student'){
            return setLoginModelOpen(true)
        }
        try {
            setBookMark(prevState => !prevState)
            const response = await axios.post(`/api/v1/student/favouritetutions/`,{
                tutionId:tution._id,
                favourite:!isBookMark
            })
            let updatedStudentDetails = {
                ...asStudent,
                favouriteTutions: !isBookMark 
                    ? [...asStudent.favouriteTutions, tution._id]  // Add the tuition ID
                    : asStudent.favouriteTutions.filter(id => id !== tution._id)  // Remove the tuition ID
            };
            dispatch({
                type:"SET_STUDENT",
                payload:updatedStudentDetails
            })
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
         <Modal isopen={isLoginModalOpen} onClose={()=>setLoginModelOpen(false)}>
            <LoginModal/>
        </Modal>
        <div className="tutor-card" key={index}>
        <div className='date-div'>
              <p>{extractDateFields()} ago</p>
        </div>
            <div className='bookmark-icon-div' onClick={BookMarkTution}>
                {
                    isBookMark?
                    <BookmarkAddedIcon fontSize='large'/>
                    :
                    <BookmarkAddIcon fontSize='large'/>
                }
            </div>
            <div className="tutor-card__profile-container">
                <div className='tutor-img-div' onClick={()=>profilenavigate(index)}>
                    <img src={tution.createdBy.profilepic} alt='tutor-img' className='tutor-img'/>
                </div>
                <div className="tutor-card__info">
                    <div className='tutor-info'>
                        <h2 className="tutor-card__name">{tution.createdBy.name}</h2>
                        <div className="tutor-card__rating">
                            <DisplayRating rating={tution.createdBy.averageRating || 0}/>
                            <span className="tutor-card__reviews">
                                <p className='tution-card-para'>({tution.createdBy.numOfReviews || 0})</p>
                            </span>
                        </div>
                    </div>
                    <div className='tution-info'>
                        <div className='tution-sub-info-1'>
                            <div className='subject-container'>
                                <p className='tution-card-para'><strong>Subjects:</strong>
                                    <div className='subjects-div'>
                                    {tution.subjects.join(', ')}
                                    </div>
                                </p>
                            </div>
                            <div> 
                              <p className='tution-card-para'><strong>Time:</strong>{tution.duration.join(' - ')}</p>
                            </div>
                            <div>
                               <p className='tution-card-para'><strong>Day:</strong> {tution.days.join(' - ')}</p>
                            </div>
                            <div>
                            <p className='tution-card-para'><strong>Fees:</strong> ₹{tution.fees}</p>
                            </div>
                        </div>
                        <div className="tution-sub-info-2">
                            <div>
                              <p className='tution-card-para'><strong>Standard:</strong> {tution.standard.join(' - ')}</p>
                            </div>
                            <div>
                               <p className='tution-card-para'><strong>Board:</strong> {tution.boards.join(', ')}</p>
                            </div>
                            <div>
                               <p className='tution-card-para'><strong>Location:</strong>{tution.createdBy.district} , {tution.createdBy.state}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default TutionCard;
