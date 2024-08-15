import React from 'react';
import './TutionCard.css';
import DisplayRating from '../DisplayRating';

function TutionCard({tution,index,profilenavigate}) {
    return (
        <div className="tutor-card" key={index}>
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
                            <p className='tution-card-para'><strong>Subjects:</strong> {tution.subjects.join(', ')}</p>
                            <p className='tution-card-para'><strong>Time:</strong>{tution.duration.join(' - ')}</p>
                            <p className='tution-card-para'><strong>Day:</strong> {tution.days.join(' - ')}</p>
                            <p className='tution-card-para'><strong>Fees:</strong> ₹{tution.fees}</p>
                        </div>
                        <div className="tution-sub-info-2">
                            <p className='tution-card-para'><strong>Standard:</strong> {tution.standard.join(' - ')}</p>
                            <p className='tution-card-para'><strong>Board:</strong> {tution.boards.join(', ')}</p>
                            <p className='tution-card-para'><strong>Location:</strong>{tution.createdBy.district} , {tution.createdBy.state}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TutionCard;
