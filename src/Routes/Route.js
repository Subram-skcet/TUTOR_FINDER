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
import ChangePassword from '../components/ChangePassword/ChangePassword';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      element:<ToastLayer> <LayoutWrapper><App /></LayoutWrapper> </ToastLayer> ,
    },
    {
      path: '/welcometeacher',
      element:<ToastLayer><LayoutWrapper><WelcomePage/></LayoutWrapper></ToastLayer>,
    },
    {
      path: '/register',
      element:<ToastLayer><LayoutWrapper><StudentMain /></LayoutWrapper></ToastLayer>,
    },
    {
      path: '/searchtutor',
      element:<ToastLayer> <LayoutWrapper><Main /></LayoutWrapper></ToastLayer>,
    },
    {
      path: '/login',
      element:<ToastLayer> <LayoutWrapper><StudentMain /></LayoutWrapper> </ToastLayer>,
    },
    {
      path:'/teacherprofile',
      element:<ToastLayer> <LayoutWrapper><TeacherProfile/></LayoutWrapper></ToastLayer> ,
    },
    {
      path:'/reset-password',
      element:<ToastLayer> <LayoutWrapper><ChangePassword/></LayoutWrapper> </ToastLayer> 
    },
    {
      path:'/myaccount/studentprofile/*',
      element: <ToastLayer> <StudentProfileRoutes/> </ToastLayer>,
    },
    {
      path: '/myaccount/teacherprofile/*',
      element:<ToastLayer> <MyProfileRoute /> </ToastLayer> ,
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

const ToastLayer = ({children}) =>{
  return(
    <>
    {children}
    <ToastContainer
     position="top-center"
     />
  </>
    );
}

export default Router;
