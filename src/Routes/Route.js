import React from 'react';
import { useRoutes } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Main from '../Main/Main';
import MyProfileRoute from '../MyAccountPage/MyProfileRoute';
import App from '../App';
import TeacherProfile from '../TeacherProfile/TeacherProfile';
import StudentProfileRoutes from '../StudentAccountPage/Routes'
import WelcomePage from '../WelcomeInstructor/WelcomePage';
import StudentMain from '../handleStudentRegisterLogin/StudentMain'
import { useEffect } from 'react';
import ChangePassword from '../components/ChangePassword/ChangePassword';
import { ToastContainer } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDataLayerValue } from '../StateProviders/StateProvider';
import 'react-toastify/dist/ReactToastify.css';
import { GetUser } from '../utils/getUser';

const Router = () => {
  const [{logged,asStudent,asTeacher},dispatch] = useDataLayerValue()
  const location = useLocation()
  const navigate = useNavigate()

  const checkCookie = (cookieName) => {
    const cookies = document.cookie.split('; ');
    return cookies.some(cookie => cookie.startsWith(`${cookieName}=`));
  };

  const handleTabVisibilityChange = () => {
    if (document.visibilityState === "visible") {
      console.log("Tab is now active");
      console.log("Logged value = ", logged, asTeacher, asStudent);
      
      if(!(checkCookie("accessToken") && checkCookie("refreshToken")) && 
      (location.pathname.startsWith('/myaccount/studentprofile') || location.pathname.startsWith('/myaccount/teacherprofile')
      || logged)
    )
          window.location.reload()
    }
  };


  useEffect(() => {
    GetUser(dispatch,location,navigate);
    document.addEventListener("visibilitychange", handleTabVisibilityChange);

    // Cleanup the event listener on unmount
    return () => {
      document.removeEventListener("visibilitychange", handleTabVisibilityChange);
    }; 
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
