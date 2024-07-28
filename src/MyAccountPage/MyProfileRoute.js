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
            <Route index path="/myaccount/myprofile" element={<MyProfile/>}/>
            <Route path="/myaccount/mytutions" element={<MyTution/>}/>
            <Route path="/myaccount/addtution" element={<AddTution/>}/>
            <Route path="/myaccount/myreview" element={<MyReview/>}/>
        </Routes>
    </App>
  )
}

export default MyProfileRoute