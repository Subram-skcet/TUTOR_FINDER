import React from 'react'
import PopUpFields from './PopUpFields'
import '@fortawesome/fontawesome-free/css/all.min.css';
import './PopUp.css'
const PopUp = () => {
    let name='Steve Job'
    let Subj_Handle=['Tamil','English']
    let location='Chennai'
    let fee=5500
    let Year_Of_Expr=0.5
    let Ratings = 3
    let reviews = 500
    let img='https://theteachershub.com/images/demo1-prf-pic.jpg'
  return (
    <div className='teacher-list-box'>
        <div className='teacher-list-img'>
          <img src={img}></img>
        </div>
        <div className='teacher-list-dets indiv-sz'>
            <h4>{name}</h4>
            <h5>Subjects Handling:{Subj_Handle}</h5>
            <h5>Location:{location}</h5>
            <h5>Fee Handling:{fee}</h5>
        </div>
        <div className='teacher-list-extr indiv-sz'>
             <div>
                <h5>Ratings:{Ratings}</h5>
                <span>({reviews})</span>
             </div>
             <h5>{Year_Of_Expr}</h5>
        </div>
    </div>
  )
}

export default PopUp