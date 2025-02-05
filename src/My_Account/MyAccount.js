import React, { useEffect, useState } from 'react';
import './MyAccount.css';
import { useNavigate } from 'react-router-dom';
import { useDataLayerValue } from '../StateProviders/StateProvider';

const MyAccount = () => {
    const [{ logged_as, asTeacher, asStudent }] = useDataLayerValue();
    const [img, setImg] = useState('');

    useEffect(() => {
        if (logged_as === 'teacher') {
            setImg(asTeacher.profilepic);
        } else if (logged_as === 'student') {
            setImg(asStudent.profilepic);
        }
    }, [logged_as, asTeacher, asStudent]);

    const handleProfileNavigate = () =>{
        if(logged_as === 'teacher')
            navigate('/myaccount/teacherprofile/myprofile')
        else if(logged_as === 'student')
            navigate('/myaccount/studentprofile/myprofile')
    }

    const navigate = useNavigate();

    return (
        <div className='acc-wrap' onClick={handleProfileNavigate}>
            <div>
                <img src={img} className='acc-img' alt='Profile' title='Visit Profile'/>
            </div>
        </div>
    );
};

export default MyAccount;
