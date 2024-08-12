import React from 'react'
import { Route,Routes } from 'react-router-dom'
import App from './MyAccountPageApp/App'
import MyProfile from './MyProfile/MyProfile'
import MyTution from './MyTution/MyTution'
import AddTution from './AddTution/AddTution'
import MyReview from './MyReviews/MyReview'

const MyProfileRoute = () => {
  return (
    <App>
        <Routes>
            <Route index path="myprofile" element={<MyProfile/>}/>
            <Route path="mytutions" element={<MyTution/>}/>
            <Route path="addtution" element={<AddTution/>}/>
            <Route path="myreviews" element={<MyReview/>}/>
        </Routes>
    </App>
  )
}

export default MyProfileRoute