import React from 'react';
import { useRoutes } from 'react-router-dom';
import Register from '../Register/Register';
import Layout from '../Layout/Layout';
import Main from '../Main/Main';
import LoginPage from '../Login/LoginPage';
import MyProfileRoute from '../MyAccountPage/MyProfileRoute';
import App from '../App';
import TeacherProfile from '../TeacherProfile/TeacherProfile';
import StudentProfileRoutes from '../StudentAccountPage/Routes'


const Router = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <LayoutWrapper><App /></LayoutWrapper>,
    },
    {
      path: '/register',
      element: <LayoutWrapper><Register /></LayoutWrapper>,
    },
    {
      path: '/searchtutor',
      element: <LayoutWrapper><Main /></LayoutWrapper>,
    },
    {
      path: '/login',
      element: <LayoutWrapper><LoginPage /></LayoutWrapper>,
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
