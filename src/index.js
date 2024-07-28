import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css'
import Layout from './Layout/Layout';
import PopUp from './TeacherPopUp/PopUp';
import RegisterTeacher from './RegisterPage/Teacher/RegisterTeacher';
import Main from './Main/Main';
import { BrowserRouter } from 'react-router-dom';
import Route from './Routes/Route';
import Search from './Search/Search';
import Login from './Login/Login';
import LoginPage from './Login/LoginPage';
import { DataLayer } from './StateProviders/StateProvider';
import reducer,{initialState} from './StateProviders/reducer';
import AccountLayout from './MyAccountPage/AccountLayout/AccountLayout';
import Sidebar from './MyAccountPage/Sidebar/Sidebar';
import TeacherProfile from './TeacherProfile/TeacherProfile';
import App from './MyAccountPage/MyAccountPageApp/App';
import MyProfile from './MyAccountPage/MyProfile/MyProfile';
import AddTution from './MyAccountPage/AddTution/AddTution';
import MyReview from './MyAccountPage/MyReviews/MyReview';
import MyTution from './MyAccountPage/MyTution/MyTution';
import Home from './Home/Home';
import ImageSlider from './Home/ImageSlider/ImageSlider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DataLayer initialState={initialState} reducer={reducer}>
      <BrowserRouter>
          <Route/>
      </BrowserRouter>
    </DataLayer>
  </React.StrictMode>
        //  <Home/>
        // <ImageSlider/>
    //  <Layout/>
    //  <MyTution/>
        // <App>
        //   <MyProfile/>
        // </App>
        //  <MyReview/>
      //  <AddTution/>
          // <Sidebar/>
          // <TeacherProfile/>
          // <AccountLayout/>
        // <MyAccount/>
      // <LoginPage/>
    // <Login/>
      // <Search/>
    //  <Main/>
    // <RegsiterStudent/>
    // <RegisterTeacher/>
    // <PopUp/>
    // <Enroll/>
    // <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
