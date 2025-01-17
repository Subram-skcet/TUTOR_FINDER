import React, { useState,useEffect } from 'react'
import './WelcomePage.css'
import coverImg from '../assets/4adcf3b1-e1d7-4182-8eab-9060423d03e7.jpeg'
import coverImg2 from '../assets/4692b327-dda6-47af-9da7-3aac5f67f089.jpeg'
import tution from '../assets/creating-tution.webp'
import growth from '../assets/development.png'
import reviews from '../assets/increasing-tution.webp'
import RegisterTeacher from '../RegisterPage/Teacher/RegisterTeacher'
import Modal from '../components/Modal/Modal'
import TeacherLogin from '../TeacherLogin/TeacherLogin'
import { handleModalSize } from '../utils/modalSize'
import axios from 'axios'

const WelcomePage = () => {
   const [isRegisterModalOpen,setRegisterModelOpen] = useState(false)
   const [isLoginModalOpen,setLoginModalOpen] = useState(false)
   const [statDetails,setStatDetails] = useState({
         studentCount : '500',
         teacherCount : '50',
         tuitionCount : '1000'

   })
   if(isRegisterModalOpen || isLoginModalOpen){
      handleModalSize()
   }

   const getCountStats = async() =>{
      try {
         const response = await axios.get('/api/v1/auth/get-stats')
         
         setStatDetails({
            studentCount:response.data.stdnt,
            teacherCount:response.data.tchr,
            tuitionCount:response.data.tut
         })
         
      } catch (error) {
         
      }

   }
   useEffect(()=>{
      window.scrollTo(0,0)
      getCountStats()
   },[])


  return (
   <>
   <Modal
   childrenWidth={isLoginModalOpen ? 439 : 810} // Simplified conditional
   isopen={isRegisterModalOpen} onClose={()=>{
      setRegisterModelOpen(false)
      setLoginModalOpen(false)
   }
   }>
      {
         isLoginModalOpen?
         <TeacherLogin openLogin={setLoginModalOpen}/>
         :
         <RegisterTeacher openLogin={setLoginModalOpen}/>
      }
   </Modal>
   <div className='top-wst'></div>
    <div className={`welcome-pg-wrap lato-regular ${isRegisterModalOpen ? 'stator':''}`}>
      <div className='welcome-part-one'>
         <div className='welcome-notes'>
            <div className='actual-content'>
               <div>
                  <h1 className='notes-heading lato-bold'>
                     Come teach with FMT(Find My Tuition)
                  </h1>
               </div>
               <div>
               <p className='welcoming-contents welcome-p  '>
               Join us to empower students and shape brighter futures—together, we grow!
               </p>
               </div>
               <div className='welcome-btn-div'>
               <button className='welcoming-btn lato-regular' onClick={()=>setRegisterModelOpen(true)}>Get Started</button>
               </div>
            </div>
          </div>
            <div className='welcome-image-div-small'>
               <img src={coverImg2} alt='Teacher Image1' className='welcome-img'/>
            </div>
            <div className='welcome-image-div'>
               <img src={coverImg} alt='Teacher Image2' className='welcome-img'/>
            </div>
         </div>
      <div className='welcome-part-two'>
        <div className='doable-heading'>
            <h1 className='welcome-p notes-heading lato-bold'>What can i do?</h1>
        </div>
        <div className='doables'>
         <div className='doable-divs'>
            <div>
                 <img alt='doable-1' src={tution} className='doable-image'/>
            </div>
            <div>
               <h3 className='welcome-p poppins-font'>Customize Your Tuitions</h3>
               <p className='welcome-p doable-para  '>Create tuitions based on your actual classes, tailored to different subjects, standards, and boards in your area.</p>
            </div>
         </div>
         <div className='doable-divs'>
             <div>
                 <img alt='doable-2' src={reviews} className='doable-image'/>
            </div>
            <h3 className='welcome-p poppins-font'>Improve with Feedback</h3>
            <p className='welcome-p  doable-para  '>Get insights into what students think of your tuitions, helping you improve in areas where you're lacking</p>
         </div>
         <div className='doable-divs'>
            <div>
                 <img alt='doable-3' src={growth} className='doable-image'/>
            </div>
            <h3 className='welcome-p poppins-font'>Expand Your Reach</h3>
            <p className='welcome-p doable-para  '>Grow your offline tuition by posting here and reach more students to expand your impact</p>
         </div>
        </div>
      </div>
      <div className='show-case'>
         <div className='lists'>
            <h1 className='count-size'>{statDetails.studentCount}</h1>
            <p className=' '>Students</p>
         </div>
         <div className='lists'>
            <h1 className='count-size'>{statDetails.teacherCount}</h1>
            <p className=' '>Teachers</p>
         </div>
         <div className='lists'>
            <h1 className='count-size'>{statDetails.tuitionCount}</h1>
            <p className=' '>Tuitions</p>
         </div>
      </div>
    </div>
   </>
  )
}

export default WelcomePage
