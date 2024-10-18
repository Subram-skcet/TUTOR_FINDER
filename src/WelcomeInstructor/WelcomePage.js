import React, { useState } from 'react'
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

const WelcomePage = () => {
   const [isRegisterModalOpen,setRegisterModelOpen] = useState(false)
   const [isLoginModalOpen,setLoginModalOpen] = useState(false)
   if(isRegisterModalOpen || isLoginModalOpen){
      handleModalSize()
   }
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
    <div className={`welcome-pg-wrap ${isRegisterModalOpen ? 'stator':''}`}>
      <div className='welcome-part-one'>
         <div className='welcome-notes'>
            <div className='actual-content'>
               <div>
                  <h1 className='notes-heading'>
                     Come teach with EduQuest
                  </h1>
               </div>
               <div>
               <p className='welcoming-contents welcome-p'>
                  Become an instructor and change lives — including your own
               </p>
               </div>
               <div className='welcome-btn-div'>
               <button className='welcoming-btn' onClick={()=>setRegisterModelOpen(true)}>Get Started</button>
               </div>
            </div>
          </div>
            <div className='welcome-image-div-small'>
               <img src={coverImg2} alt='Teacher Image' className='welcome-img'/>
            </div>
            <div className='welcome-image-div'>
               <img src={coverImg} alt='Teacher Image' className='welcome-img'/>
            </div>
         </div>
      <div className='welcome-part-two'>
        <div className='doable-heading'>
            <h1 className='welcome-p notes-heading'>What can i do?</h1>
        </div>
        <div className='doables'>
         <div className='doable-divs'>
            <div>
                 <img src={tution} className='doable-image'/>
            </div>
            <div>
               <h2 className='welcome-p'>Customize Your Tuitions</h2>
               <p className='welcome-p doable-para'>Create tuitions based on your actual classes, tailored to different subjects, standards, and boards in your area.</p>
            </div>
         </div>
         <div className='doable-divs'>
             <div>
                 <img src={reviews} className='doable-image'/>
            </div>
            <h2 className='welcome-p'>Improve with Feedback</h2>
            <p className='welcome-p  doable-para'>Get insights into what students think of your tuitions, helping you improve in areas where you're lacking</p>
         </div>
         <div className='doable-divs'>
            <div>
                 <img src={growth} className='doable-image'/>
            </div>
            <h2 className='welcome-p'>Expand Your Reach</h2>
            <p className='welcome-p doable-para'>Grow your offline tuition by posting here and reach more students to expand your impact</p>
         </div>
        </div>
      </div>
      <div className='show-case'>
         <div className='lists'>
            <h1 className='count-size'>100</h1>
            <p>Students</p>
         </div>
         <div className='lists'>
            <h1 className='count-size'>100</h1>
            <p>Teachers</p>
         </div>
         <div className='lists'>
            <h1 className='count-size'>100</h1>
            <p>Tutions</p>
         </div>
      </div>
    </div>
   </>
  )
}

export default WelcomePage
