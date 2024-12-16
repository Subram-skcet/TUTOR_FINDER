import React, { useEffect, useState } from 'react';
import './TutionCard.css';
import DisplayRating from '../DisplayRating';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import axios from 'axios';
import {useDataLayerValue} from '../../StateProviders/StateProvider'
import Modal from '../Modal/Modal';
import LoginModal from '../LoginModal/LoginModal';
import { extractDateFields } from '../../utils/getCreatedAt'
import { toast } from 'react-toastify';
import profileimg from '../../assets/17330480.png'
import { convertTo12Hour } from '../../utils/TimeFormatConverter';
import { FaRupeeSign } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import StudentSideMap  from '../StudentMap/StudentSideMap'

function TutionCard({tution,index,profilenavigate,setModalOpen}) {
    const [{asStudent,logged,logged_as},dispatch] = useDataLayerValue()
    const [isBookMark,setBookMark] = useState(()=>{
        if(logged && logged_as === 'student'){
            return asStudent.favouriteTutions.includes(tution._id);
        }
        return false
    })
    const [isLoginModalOpen,setLoginModelOpen] = useState(false)
    const [isMapOpen,setMapOpen] = useState(false)

    const BookMarkTution = async() =>{
        if(!logged){
            return setLoginModelOpen(true)
        }
        if(logged_as !== 'student'){
            toast.warn("This feature is supposed for students. Teacher's can't use this")
            return
        }
        try {
            setBookMark(prevState => !prevState)
            const response = await axios.post(`/api/v1/student/favouritetutions/`,{
                tutionId:tution._id,
                favourite:!isBookMark
            })
            if(response.status === 201){
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
                if(!isBookMark)
                 toast.success('Added into your Bookmark list')
                else
                 toast.success('Removed from Bookmark list')
            }
        } catch (error) {
            toast.error('Something went wrong try again later')
            console.log(error.message);
        }
    }

    useEffect(()=>{
        if(isLoginModalOpen || isMapOpen)
            setModalOpen(true)
        else
            setModalOpen(false)
    },[isLoginModalOpen,isMapOpen])

    return (
        <>
         <Modal  childrenWidth={400} isopen={isLoginModalOpen} onClose={()=>setLoginModelOpen(false)}>
            <LoginModal/>
        </Modal>
        <Modal  childrenWidth={400} isopen={isMapOpen} onClose={()=>setMapOpen(false)}>
            <StudentSideMap lat={tution.location[0]} lng={tution.location[1]}/>
        </Modal>
        <div className="tutor-card" key={index}>
        <div className='date-div'>
              <p className='createdAt-p'>{extractDateFields(tution.createdAt)}</p>
        </div>
            <div className='bookmark-icon-div' onClick={BookMarkTution}>
                {
                    isBookMark?
                        <div className='bookmark-icon' title="Remove from Bookmark">
                        <BookmarkAddedIcon fontSize='large'/>
                        </div>
                    :
                    <div className='bookmark-icon' title="Add to Bookmark">
                       <BookmarkAddIcon fontSize='large'/>
                    </div>
                }
            </div>
            <div className="tutor-card__profile-container pt-serif-regular">
                <div className='tutor-img-div bg-scr-div' onClick={()=>profilenavigate(index)}>
                    <img src={tution.createdBy.profilepic} alt='tutor-img' className='tutor-img' title={`${tution.createdBy.name}'s profile`}/>
                </div>
                <div className='mobile-visit-prof-div'>
                    <div className='tutor-img-div  mb-scr-div'>
                        <img src={tution.createdBy.profilepic} alt='tutor-img' className='tutor-img' title={`${tution.createdBy.name}'s profile`}/>
                    </div>
                    <div onClick={()=>profilenavigate(index)} className='visit-prof-div'>
                        <img src={profileimg} className='visit-profile-img'/>
                        <p className='vsp-prof-p'>Visit profile</p>
                    </div>
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
                              <p className='tution-card-para'><strong>Time:</strong>{`${convertTo12Hour(tution.duration[0])} - ${convertTo12Hour(tution.duration[1])}`}</p>
                            </div>
                            <div>
                               <p className='tution-card-para'><strong>Day:</strong> {tution.days.join(' - ')}</p>
                            </div>
                            <div>
                               <p className='tution-card-para'><strong>Location:</strong>
                               {/* See location on map */}
                               <button onClick={()=>setMapOpen(true)}>
                               <FaLocationDot/>
                               </button>
                                {/* {tution.location.join(' - ')} */}
                               </p>
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
                               <p className='tution-card-para'><strong>Place:</strong>{tution.createdBy.district} , {tution.createdBy.state}</p>
                            </div>
                            <div>
                                <p className='tution-card-para '><strong>Fees:</strong> 
                                <span className='rp'><FaRupeeSign size="0.85em"/>{tution.fees}</span>
                                
                            </p>
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
