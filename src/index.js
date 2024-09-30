import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
// import './index.css'
import { DataLayer } from './StateProviders/StateProvider';
import reducer,{initialState} from './StateProviders/reducer';
import TutionCard from './components/TutionCard/TutionCard';
import { BrowserRouter } from 'react-router-dom';
import Route from './Routes/Route'
import WelcomePage from './WelcomeInstructor/WelcomePage';
import AboutPage from './components/AboutPage/About';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <React.StrictMode>
    <AboutPage/>
  </React.StrictMode>
  </>
    // <DataLayer initialState={initialState} reducer={reducer}>
    //  <BrowserRouter>
    //   <Route/>
    // </BrowserRouter>
    // </DataLayer>
      //  <WelcomePage/>
      //  <Search/>
    // <TutionCard/>
        // <LoginModal/>
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
