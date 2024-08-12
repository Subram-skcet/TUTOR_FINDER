import React from 'react'
import { Route,Routes } from 'react-router-dom'
import App from './App'
import StudentProfile from './StudentProfile/StudentProfile'
import Bookmark from './BookmarkTutions/Bookmark'
import MyReviews from './MyReviews/MyReview'

const StudentProfileRoutes = () => {
  return (
    <App>
        <Routes>
            <Route index path="myprofile" element={<StudentProfile/>}/>
            <Route path="mybookmarks" element={<Bookmark/>}/>
            <Route path="myreviews" element={<MyReviews/>}/>
        </Routes>
    </App>
  )
}

export default StudentProfileRoutes