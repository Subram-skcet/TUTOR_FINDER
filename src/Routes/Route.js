import React from 'react';
import { useRoutes } from 'react-router-dom';
import Register from '../Register/Register';
import Layout from '../Layout/Layout';
import Main from '../Main/Main';
import MyProfileRoute from '../MyAccountPage/MyProfileRoute';
import App from '../App';
import TeacherProfile from '../TeacherProfile/TeacherProfile';
import StudentProfileRoutes from '../StudentAccountPage/Routes'
import WelcomePage from '../WelcomeInstructor/WelcomePage';
import RegisterTeacher from '../RegisterPage/Teacher/RegisterTeacher';
import StudentMain from '../handleStudentRegisterLogin/StudentMain'
import StudentLogin from '../handleStudentRegisterLogin/StudentLogin/StudentLogin'
import { useDataLayerValue } from '../StateProviders/StateProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const Router = () => {
  const [{logged},dispatch] = useDataLayerValue()
  const navigate = useNavigate()

  const getUser = async () => {
    try {
      const response = await axios.get('/get-user'); 
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
      } else if (response.data.teacher) {
        dispatch({
          type: 'SET_TEACHER',
          payload: response.data.teacher
        });
        dispatch({
          type: 'LOGGED_USER',
          payload: 'teacher'
        });
      }
    } catch (error) {
      navigate('/'); 
    }
  };

  useEffect(() => {
    getUser(); 
  }, []);

  const routes = useRoutes([
    {
      path: '/',
      element: <LayoutWrapper><App /></LayoutWrapper>,
    },
    {
      path: '/welcometeacher',
      element: <LayoutWrapper><WelcomePage/></LayoutWrapper>,
    },
    {
      path: '/register',
      element:<LayoutWrapper><StudentMain /></LayoutWrapper>,
    },
    {
      path: '/searchtutor',
      element: <LayoutWrapper><Main /></LayoutWrapper>,
    },
    {
      path: '/login',
      element:<LayoutWrapper><StudentMain /></LayoutWrapper>,
    },
    {
      path:'/teacherprofile',
      element: <LayoutWrapper><TeacherProfile/></LayoutWrapper>,
    },
    {
      path:'/myaccount/studentprofile/*',
      element:<StudentProfileRoutes/>,
    },
    {
      path: '/myaccount/teacherprofile/*',
      element: <MyProfileRoute />,
    },
  ]);

  return routes;
};

const LayoutWrapper = ({ children }) => {
  return (
    <Layout>
      {children}
    </Layout>
  );
};

export default Router;
