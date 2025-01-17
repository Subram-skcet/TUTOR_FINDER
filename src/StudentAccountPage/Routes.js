import React from 'react'
import { useRoutes } from 'react-router-dom'
import App from './App'
import StudentProfile from './StudentProfile/StudentProfile'
import Bookmark from './BookmarkTutions/Bookmark'
import MyReviews from './MyReviews/MyReview'
import NotFound from '../404/404'
import { LayoutWrapper } from '../Routes/Route'
import TeacherProfile from '../TeacherProfile/TeacherProfile'

const StudentProfileRoutes = () => {
  const routes = useRoutes([
    {
      path:'/myprofile',
      element:<App><StudentProfile/></App>
    },
    {
      path:'/mybookmarks',
      element:<App><Bookmark/></App>
    },
    {
      path:'/myreviews',
      element:<App><MyReviews/></App>
    },
    {
      path:'/teacherprofile',
      element:<App><TeacherProfile/></App> ,
    },
    {
      path:'*',
      element:<LayoutWrapper><NotFound/></LayoutWrapper>
    },


  ])
   return routes
}

export default StudentProfileRoutes