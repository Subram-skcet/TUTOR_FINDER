// Utility function
import axios from 'axios';

export const GetUser = async (dispatch, location, navigate) => {
  try {
    const response = await axios.get('/get-user',{
      withCredentials:true
    });
    dispatch({
      type: 'LOG_USER',
      payload: true
    });

    if (response.data.student) {
      dispatch({
        type: 'SET_STUDENT',
        payload: response.data.student
      });
      dispatch({
        type: 'LOGGED_USER',
        payload: 'student'
      });

      if (location.pathname.startsWith('/myaccount/teacherprofile'))
          navigate('/')
    } else if (response.data.teacher) {
      dispatch({
        type: 'SET_TEACHER',
        payload: response.data.teacher
      });
      dispatch({
        type: 'LOGGED_USER',
        payload: 'teacher'
      });
      if (location.pathname.startsWith('/myaccount/studentprofile'))
        navigate('/')
    }

    
  } catch (error) {
    
    if (location.pathname.startsWith('/myaccount/studentprofile')) {
      navigate('/login');
    } else if (location.pathname.startsWith('/myaccount/teacherprofile')) {
      navigate('/');
    }
  }
};
